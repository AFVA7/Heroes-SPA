import { AuthProvider } from "./auth"
import { RouterApp } from "./router/RouterApp"

export const HeroesApp = () => {
  return (
    <>
      <AuthProvider>
        <RouterApp />
      </AuthProvider>

    </>
  )
}
