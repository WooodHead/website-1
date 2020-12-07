import {CombatMetricsInterface} from "@/interfaces/CombatMetricsInterface";
import {OutfitInterface} from "@/interfaces/OutfitInterface";

export interface InstanceOutfitAggregateResponseInterface extends CombatMetricsInterface{
  instance: string;
  outfit: OutfitInterface;
  participants?: number
}