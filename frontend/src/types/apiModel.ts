import {paths} from "@/types/api";

export type GoogleAccount = paths['/api/google/account']['get']['responses']['200']['content']['*/*']
export type GoogleLocation = paths['/api/google/location']['get']['responses']['200']['content']['*/*']