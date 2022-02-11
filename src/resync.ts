import type { Socket } from "socket.io-client"
import type { RoomState, PublicMember } from "$/room"
import type { BackendEmits, PointerUpdate, ResyncSocketFrontend, RoomEmit } from "$/socket"

import { Ref, ref, watch, computed } from "vue"
import { bufferedStub, capitalize, debug, ls } from "./util"
import { setMetadata } from "./mediaSession"
import { MediaSourceAny } from "$/mediaSource"
import { Permission, checkPermission } from "../backend/permission"
import { Category } from "sponsorblock-api"
import { defaultSegmentColors } from "./sponsorblock"
import { BlockedSegment } from "$/sponsorblock"

const log = debug("resync.ts")

export type SocketOff = () => void

export default class Resync {
  private socket: ResyncSocketFrontend
  private roomEmit: RoomEmit
  private roomID: string
  private handlers: SocketOff[] = []
  updatePlaybackSpeed = (): void => undefined
  currentTime = (): number => NaN
  updateProgress = (): void => undefined
  duration = (): number => NaN
  buffered = (): HTMLMediaElement["buffered"] => bufferedStub
  hostSecret = ""
  blocked = (): BlockedSegment[] | void => undefined
  segmentColors = ls("segment-colors") ?? defaultSegmentColors
  playbackSpeed = computed(() => {
    return this.state.value.playbackSpeed
  })

  fullscreenEnabled: Ref<boolean> | undefined
  paused = ref(true)
  volume = ref(ls("resync-volume") ?? 0.5)
  muted = ref(ls("resync-muted") ?? false)
  state: Ref<RoomState>
  mousePos: Ref<[number, number]> = ref([0, 0] as [number, number])
  lastMousePos: [number, number] = [0, 0]
  mouseActive: Ref<boolean> = ref(true)
  pointerUpdateInterval: NodeJS.Timeout
  sharedPointers: Ref<PointerUpdate[]> = ref([])

  ownPermission = computed(() => {
    const ownMember = this.state.value.members.find(m => m.id === this.socket.id)
    if (!ownMember) throw "i just can't find myself"

    return ownMember.permission
  })

  ownId = computed(() => this.socket.id)

  hasPermission = (permission: Permission) => {
    return checkPermission(this.ownPermission.value, permission)
  }

  pointerUpdate = (): void => {
    if (this.mousePos.value !== this.lastMousePos) {
      this.roomEmit("pointerUpdate", {
        pos: this.mousePos.value,
        active: this.mouseActive.value,
      })
      this.lastMousePos = this.mousePos.value
    }
  }

  constructor(socket: Socket, roomID: string) {
    this.socket = socket
    this.roomID = roomID
    this.roomEmit = (event, arg, ...args) => {
      const secret = this.hostSecret
      log.extend("roomEmit")(event, { roomID, secret, ...arg }, ...args)
      socket.emit(event, { roomID, secret, ...arg }, ...args)
    }

    this.state = ref({
      playbackSpeed: 1.0,
      blockedCategories: [],
      defaultPermission: Permission.ContentControl ^ Permission.PlaybackControl,
      looping: false,
      paused: this.paused.value,
      source: undefined,
      lastSeekedTo: 0,
      members: [],
      membersLoading: 0,
      queue: [],
      sharedPointerEnabled: true,
    })

    this.pointerUpdateInterval = setInterval(this.pointerUpdate, 50)
    this.handlers.push(() => clearInterval(this.pointerUpdateInterval))

    this.handlers.push(
      watch(this.volume, volume => {
        ls("resync-volume", volume)
      }),
      watch(this.muted, muted => {
        ls("resync-muted", muted)
      }),
      this.onState(state => {
        log("new state", state)
        this.state.value = state
        this.updatePlaybackSpeed()
      }),
      this.onSource((source?: MediaSourceAny) => {
        this.updateMediasession(source)
      })
    )
  }
  destroy = (): void => this.handlers.forEach(off => off())

  private eventHandler<E extends keyof BackendEmits>(event: E) {
    return (fn: BackendEmits[E]): SocketOff => {
      // @ts-expect-error I am clueless as to why this errors
      this.socket.on(event, fn)
      log(`registered on${capitalize(event)} handler`)

      return () => {
        // @ts-expect-error I am clueless as to why this errors
        this.socket.off(event, fn)
        log(`unregistered on${capitalize(event)} handler`)
      }
    }
  }

  private updateMediasession = (source?: MediaSourceAny) => {
    if (source) setMetadata(source, `room: ${this.roomID}`)
  }

  static getNewRandom = (socket: ResyncSocketFrontend): Promise<string> => {
    return new Promise(res => {
      socket.emit("getNewRandom", res)
    })
  }

  search = (query: string): Promise<MediaSourceAny[]> => {
    return new Promise(res => this.socket.emit("search", query, res))
  }

  loop = () => this.roomEmit("loop", { newState: !this.state.value.looping })

  joinRoom = async (name: string): Promise<void> => {
    const join = () => {
      return new Promise<void>(res => {
        this.roomEmit("joinRoom", { name }, state => {
          log("initial room state", state)

          this.state.value = state
          this.updateMediasession(state.source)

          res()
        })
      })
    }

    const connect = () => {
      this.socket.off("connect", connect)
      join()
    }

    const disconnect = () => {
      this.socket.on("connect", connect)
    }

    const pointerUpdate = (
      sharedPointers: Array<{ member: PublicMember; pos: [number, number]; active: boolean }>
    ) => {
      this.sharedPointers.value = sharedPointers
    }

    this.socket.on("pointerUpdate", pointerUpdate)
    this.handlers.push(() => this.socket.off("pointerUpdate", pointerUpdate))

    this.socket.on("disconnect", disconnect)

    this.handlers.push(() => this.socket.off("disconnect", disconnect))
    this.handlers.push(() => this.roomEmit("leaveRoom"))

    await join()
  }

  playContent = (source: string, startFrom?: number): void =>
    this.roomEmit("playContent", { source, startFrom })
  queue = (source: string, startFrom?: number): void =>
    this.roomEmit("queue", { source, startFrom })
  changePlaybackSpeed = (newSpeed: number): void =>
    this.roomEmit("changePlaybackSpeed", { newSpeed })
  editBlocked = (newBlocked: Array<Category>): void =>
    this.roomEmit("editBlocked", { newBlocked })
  toggleSharedPointer = (): void => this.roomEmit("toggleSharedPointer")
  playQueued = (index: number): void => this.roomEmit("playQueued", { index })
  clearQueue = (): void => this.roomEmit("clearQueue")
  removeQueued = (index: number): void => this.roomEmit("removeQueued", { index })
  loaded = (): void => this.roomEmit("loaded")
  finished = (): void => this.roomEmit("finished")
  pause = (currentTime: number): void => this.roomEmit("pause", { currentTime })
  resume = (): void => this.roomEmit("resume")
  seekTo = (currentTime: number): void => this.roomEmit("seekTo", { currentTime })
  resync = (): void => this.roomEmit("resync")
  message = (msg: string): void => this.roomEmit("message", { msg })
  grantPermission = (id: string, permission: Permission, defaultValue: boolean): void =>
    this.roomEmit("givePermission", { permission, id, defaultValue })
  revokePermission = (id: string, permission: Permission, defaultValue: boolean): void =>
    this.roomEmit("removePermission", { permission, id, defaultValue })

  playbackError = (error: { reason: string; name: string }, currentTime: number): void => {
    this.roomEmit("playbackError", { ...error, currentTime })
  }
  onSource = this.eventHandler("source")
  onPause = this.eventHandler("pause")
  onResume = this.eventHandler("resume")
  onSeekTo = this.eventHandler("seekTo")
  onRequestTime = this.eventHandler("requestTime")
  onNotify = this.eventHandler("notifiy")
  onState = this.eventHandler("state")
  onMessage = this.eventHandler("message")
  onSecret = this.eventHandler("secret")
  onPointerUpdate = this.eventHandler("pointerUpdate")
}
