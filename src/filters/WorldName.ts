import {World} from "@/constants/World";

export const WorldName = function(world: World) {
  switch (world) {
    // PC worlds
    case World.COBALT:
      return 'Cobalt'
    case World.CONNERY:
      return 'Connery'
    case World.EMERALD:
      return 'Emerald'
    case World.JAEGER:
      return 'Jaeger'
    case World.MILLER:
      return 'Miller'
    case World.SOLTECH:
      return 'Soltech'
    // PS4 Worlds
    case World.CERES:
      return 'Ceres'
    case World.GENUDINE:
      return 'Genudine'
    default:
      return 'UNKNOWN!'
  }
}