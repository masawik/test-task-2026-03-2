export type Override<Base, Extension> = Omit<Base, keyof Extension> & Extension
