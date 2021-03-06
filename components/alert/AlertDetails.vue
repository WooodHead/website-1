<template>
  <div class="col-span-12 lg:col-span-6 ss:col-span-3 card">
    <div class="tag section">General Info</div>
    <table class="min-w-full divide-y divide-gray-500">
      <tbody class="divide-y divide-gray-200">
        <tr>
          <td class="px-2 py-1 whitespace-nowrap">
            <div class="flex justify-between">
              <div class="mr-4 font-bold">Started</div>
              <div>
                {{ alert.timeStarted | dateTimeFormat }}
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-1 md:py-2 whitespace-nowrap">
            <div class="flex justify-between">
              <div class="mr-4 font-bold">Ended</div>
              <div v-if="ended">
                {{ alert.timeEnded | dateTimeFormat }}
              </div>
              <div v-if="!ended">TBD</div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-1 md:py-2 whitespace-nowrap">
            <div class="flex justify-between">
              <div class="mr-4 font-bold">Server</div>
              <div>
                {{ alert.world | worldName }}
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-1 md:py-2 whitespace-nowrap">
            <div class="flex justify-between">
              <div class="mr-4 font-bold">Continent</div>
              <div>
                {{ alert.zone | zoneName }}
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-1 md:py-2 whitespace-nowrap">
            <div class="flex justify-between">
              <div class="mr-4 font-bold">Activity</div>
              <div v-if="alert.bracket === -1">
                <font-awesome-icon
                  :icon="['fa', 'sync']"
                  class="animate-spin"
                ></font-awesome-icon>
              </div>
              <div v-else>
                {{ alert.bracket | bracketName }}
                <span v-if="alert.state === 1">
                  <v-tooltip bottom>
                    <template #activator="{ on, attrs }">
                      <font-awesome-icon
                        :icon="['fas', 'info-circle']"
                        v-bind="attrs"
                        v-on="on"
                      ></font-awesome-icon>
                    </template>
                    This may change until the alert ends as it is based on
                    population levels, which naturally fluctuate.
                  </v-tooltip>
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td class="px-2 py-1 md:py-2 whitespace-nowrap">
            <div class="flex justify-between">
              <div class="mr-4 font-bold">Triggered by</div>
              <div>
                {{ instanceEventDetails.triggeringFaction | factionName }}
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { InstanceTerritoryControlResponseInterface } from '@/interfaces/InstanceTerritoryControlResponseInterface'
import { Ps2alertsEventState } from '@/constants/Ps2alertsEventState'
import { InstanceEventDetails } from '@/constants/InstanceEventDetails'
import { MetagameDetailsInterface } from '@/interfaces/MetagameDetailsInterface'

export default Vue.extend({
  name: 'AlertDetails',
  props: {
    alert: {
      type: Object as () => InstanceTerritoryControlResponseInterface,
      default: {},
      required: true,
    },
  },
  computed: {
    ended(): boolean {
      return this.alert.state === Ps2alertsEventState.ENDED
    },
    instanceEventDetails(): MetagameDetailsInterface | null | undefined {
      return InstanceEventDetails(this.alert.censusMetagameEventType || 0)
    },
  },
})
</script>
