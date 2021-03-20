import { defineComponent, h } from "vue"

export default defineComponent({
  name: "ResyncLogo",
  setup() {
    return () =>
      h(
        "svg",
        {
          viewBox: "0 0 512 188",
          xmlns: "http://www.w3.org/2000/svg",
        },
        [
          h("path", {
            d:
              "M95.297 65.784c-10.1 0-18.637 3.607-25.851 10.701-7.094 7.094-10.581 15.631-10.581 25.731v25.371c0 1.683.48 3.006 1.683 4.088 1.082 1.203 2.405 1.684 4.088 1.684 1.563 0 2.886-.481 3.968-1.684 1.203-1.082 1.804-2.405 1.804-4.088v-25.371c0-6.853 2.405-12.745 7.214-17.555 4.93-4.93 10.822-7.334 17.675-7.334 1.564 0 2.886-.602 4.089-1.684 1.082-1.202 1.683-2.525 1.683-4.088a5.725 5.725 0 00-1.683-4.088c-1.203-1.082-2.525-1.683-4.088-1.683zM140.66 133.84c7.936 0 14.91-2.405 21.042-7.455 1.323-.962 1.924-2.285 2.164-3.848.121-1.683-.24-3.006-1.322-4.329-.962-1.202-2.285-1.924-3.848-2.044-1.563-.12-3.006.241-4.208 1.323-4.089 3.246-8.658 4.809-13.828 4.809-6.012 0-11.182-2.044-15.391-6.372-4.328-4.209-6.372-9.379-6.372-15.391 0-6.012 2.044-11.182 6.372-15.51 4.209-4.21 9.379-6.374 15.391-6.374 4.93 0 9.379 1.564 13.347 4.57 3.847 3.006 6.372 6.853 7.695 11.543H140.66a5.725 5.725 0 00-4.088 1.683 5.727 5.727 0 00-1.684 4.088c0 1.563.602 3.006 1.684 4.088a5.727 5.727 0 004.088 1.684h27.655c1.563 0 2.886-.602 3.968-1.684 1.203-1.082 1.804-2.525 1.804-4.088 0-9.258-3.367-17.074-9.86-23.567-6.493-6.493-14.309-9.86-23.567-9.86-9.258 0-17.074 3.367-23.567 9.86-6.493 6.493-9.739 14.309-9.739 23.567 0 9.259 3.246 17.074 9.739 23.567 6.493 6.493 14.309 9.74 23.567 9.74zM224.118 69.631c-4.088-1.683-8.778-2.525-13.948-2.525-4.329 0-8.297.722-12.024 2.044-3.848 1.443-6.854 3.487-9.138 6.133-2.405 2.765-3.487 6.132-3.487 9.98 0 9.739 7.695 16.112 23.086 18.997 5.892 1.203 10.1 2.526 12.625 4.209 2.405 1.683 3.727 3.727 3.727 6.132 0 2.645-1.322 4.689-3.847 6.132-2.525 1.563-6.012 2.285-10.581 2.285-3.487 0-6.734-.601-9.74-1.804-3.126-1.202-5.411-2.765-6.854-4.449-1.442-1.442-3.006-2.164-4.569-2.164-1.322 0-2.765.601-4.208 1.683-1.683 1.203-2.405 2.766-2.405 4.69 0 1.443.481 2.765 1.563 3.727 2.646 2.766 6.493 4.93 11.303 6.613 4.809 1.684 9.86 2.526 15.391 2.526 5.41 0 10.1-.842 13.947-2.526 3.848-1.683 6.854-4.088 8.898-7.094 1.924-3.006 3.006-6.372 3.006-10.1 0-4.93-1.924-9.018-5.531-12.144-3.607-3.126-9.86-5.531-18.517-7.335-4.329-.841-7.575-1.683-9.739-2.645-2.285-.962-3.848-1.924-4.569-3.006-.842-1.082-1.203-2.405-1.203-4.088 0-2.165 1.082-3.968 3.487-5.17 2.405-1.203 5.411-1.924 9.138-1.924 3.127 0 5.892.48 8.177 1.202 2.164.721 4.328 2.044 6.372 3.848 1.684 1.563 3.487 2.284 5.652 2.284 1.322 0 2.404-.24 3.366-.962 1.323-1.082 2.044-2.284 2.044-3.727 0-1.202-.601-2.525-1.563-3.848-2.404-2.886-5.771-5.29-9.859-6.974zM306.358 72.878c0-2.165-1.322-3.728-3.727-4.69-.962-.36-1.924-.6-2.886-.6-2.164 0-3.727 1.202-4.689 3.486l-19.359 43.647-22.004-43.767c-1.202-2.164-2.886-3.367-5.05-3.367-.962 0-1.683.24-2.405.481a6.137 6.137 0 00-2.525 2.044 4.624 4.624 0 00-.962 2.886c0 .962.12 1.804.601 2.525l27.054 51.343-12.024 27.054c-.481.962-.721 1.923-.721 2.885 0 2.165 1.202 3.728 3.607 4.69 1.082.481 2.044.721 2.886.721 2.164 0 3.727-1.202 4.689-3.727l36.794-82.725c.481-1.083.721-2.044.721-2.886zM372.618 133.719c1.683 0 3.126-.601 4.329-1.803 1.202-1.203 1.683-2.646 1.683-4.329V96.685c0-8.416-3.006-15.63-8.898-21.643-6.012-6.012-13.346-9.018-21.763-9.018-8.537 0-15.752 3.006-21.764 9.018-6.012 6.012-9.018 13.227-9.018 21.643v30.902c0 1.683.601 3.126 1.804 4.329 1.202 1.202 2.645 1.683 4.208 1.683 1.684 0 3.127-.481 4.329-1.683 1.202-1.203 1.683-2.646 1.683-4.329V96.685c0-5.05 1.924-9.499 5.531-13.106 3.608-3.727 8.056-5.53 13.227-5.53 5.17 0 9.499 1.803 13.226 5.53 3.607 3.607 5.411 8.056 5.411 13.106v31.022c0 1.563.601 3.006 1.803 4.209 1.203 1.202 2.646 1.803 4.209 1.803zM451.933 77.928c-6.252-7.215-14.188-10.822-23.567-10.822-6.252 0-11.904 1.443-16.834 4.329-5.05 2.886-8.897 6.854-11.663 11.904-2.765 5.05-4.088 10.821-4.088 17.194 0 6.253 1.323 12.024 4.208 17.074 2.886 5.05 6.854 9.018 11.904 11.904 5.05 2.886 10.702 4.329 17.074 4.329 8.658 0 15.872-2.646 21.643-8.057.962-.961 1.443-2.044 1.443-3.246 0-1.563-.841-3.006-2.284-4.329-.962-.721-2.044-1.082-3.126-1.082-1.443 0-3.006.601-4.449 1.684-3.367 2.885-7.816 4.208-13.227 4.208-4.208 0-7.936-.962-11.182-2.886-3.246-1.924-5.772-4.569-7.575-7.936-1.804-3.366-2.645-7.334-2.645-11.663 0-6.733 1.923-12.264 5.771-16.353 3.848-4.088 8.778-6.252 15.03-6.252 3.006 0 5.651.601 8.056 1.563 2.405.962 4.569 2.525 6.613 4.69 1.203 1.442 2.766 2.164 4.69 2.164.962 0 1.924-.24 2.765-.842 1.684-1.202 2.645-2.645 2.645-4.449 0-1.202-.48-2.164-1.202-3.126z",
            class: "transition-colors max-h-full",
          }),
        ]
      )
  },
})