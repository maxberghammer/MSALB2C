import { InjectionToken } from "@angular/core";

export const MSALB2C_INSTANCE = new InjectionToken<string>("MSALB2C_INSTANCE");
export const MSALB2C_GUARD_CONFIG = new InjectionToken<string>("MSALB2C_GUARD_CONFIG");
export const MSALB2C_INTERCEPTOR_CONFIG = new InjectionToken<string>("MSALB2C_INTERCEPTOR_CONFIG");

export enum InteractionType {
    REDIRECT = "redirect",
    POPUP = "popup",
    SILENT = "silent"
}
