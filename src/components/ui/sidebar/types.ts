
import * as React from "react"

export type SidebarContextType = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export const SidebarKeyboardShortcut = "b"
export const SidebarCookieName = "sidebar:state"
export const SidebarCookieMaxAge = 60 * 60 * 24 * 7
export const SidebarWidth = "16rem"
export const SidebarWidthMobile = "18rem"
export const SidebarWidthIcon = "3rem"
