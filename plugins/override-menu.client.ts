// plugins/override-menu.client.ts
export default defineNuxtPlugin(() => {
    const appConfig = useAppConfig()
    appConfig.menu = [
        ...appConfig.menu
    ]
})