<template>
  <div>
    <div class="tag section">Weapon Metrics</div>
    <div v-if="!loaded" class="text-center">
      <h1>Loading...</h1>
    </div>
    <div v-if="loaded" class="grid grid-cols-12">
      <div class="col-span-12 mb-4">Total weapons: {{ data.length }}</div>
      <div class="col-span-12">
        <table class="table-fixed w-full text-center border-col border-row">
          <thead>
            <tr class="border-b border-gray-600 font-bold">
              <td class="w-1/12 py-2 text-left">Rank</td>
              <td class="w-8/12 py-2 text-left">Weapon</td>
              <td class="w-1/12 py-2">Kills</td>
              <td class="w-1/12 py-2">TKs</td>
              <td class="w-1/12 py-2">Suicides</td>
              <td class="w-1/12 py-2">Headshots</td>
              <td class="w-1/12 py-2">HSR %</td>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(weapon, index) in data"
              :key="weapon.id"
              class="mb-2"
              :class="rowClass(weapon)"
            >
              <td class="text-left">
                {{ index + 1 }}
              </td>
              <td class="text-left">
                <span v-if="weapon.weapon.tag">[{{ weapon.weapon.tag }}]</span>
                {{ weapon.weapon.name | itemShortName }}
              </td>
              <td>
                {{ weapon.kills || 0 }}
              </td>
              <td>
                {{ weapon.teamKills || 0 }}
              </td>
              <td>
                {{ weapon.suicides || 0 }}
              </td>
              <td>
                {{ weapon.headshots || 0 }}
              </td>
              <td>
                {{
                  weapon.headshots && weapon.kills
                    ? ((weapon.headshots / weapon.kills) * 100).toFixed(2)
                    : 0
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { InstanceTerritoryControlResponseInterface } from '@/interfaces/InstanceTerritoryControlResponseInterface'
import ApiRequest from '@/api-request'
import { Ps2alertsEventState } from '@/constants/Ps2alertsEventState'
import { Endpoints } from '@/constants/Endpoints'
import { InstanceWeaponAggregateResponseInterface } from '@/interfaces/aggregates/instance/InstanceWeaponAggregateResponseInterface'
import { FactionBgClass } from '@/constants/FactionBgClass'

export default Vue.extend({
  name: 'AlertWeaponMetrics',
  props: {
    alert: {
      type: Object as () => InstanceTerritoryControlResponseInterface,
      default: {},
      required: true,
    },
  },
  data() {
    return {
      error: null,
      loaded: false,
      interval: undefined as undefined | number,
      data: {} as InstanceWeaponAggregateResponseInterface[],
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {
    clearInterval(this.interval)
    this.init()
  },
  methods: {
    init(): void {
      this.pull()
      this.interval = window.setInterval(() => {
        this.pull()
      }, 10000)
    },
    async pull(): Promise<void> {
      if (this.loaded && this.alert.state === Ps2alertsEventState.ENDED) {
        return
      }

      await new ApiRequest()
        .get<InstanceWeaponAggregateResponseInterface[]>(
          Endpoints.AGGREGATES_INSTANCE_WEAPON.replace(
            '{instance}',
            this.alert.instanceId
              ? this.alert.instanceId.toString()
              : 'whatever'
          ),
          {
            sortBy: 'kills',
            order: 'desc',
          }
        )
        .then((result) => {
          this.data = result
          this.loaded = true
        })
        .catch((e) => {
          this.error = e.message
        })
    },
    rowClass(weapon: InstanceWeaponAggregateResponseInterface): object {
      return FactionBgClass(weapon.weapon.faction)
    },
  },
})
</script>