<template>
  <rt-table
    :columns="columns"
    :empty="$t('retour.failures.empty')"
    :label="$t('retour.failures')"
    :options="options"
    :rows="rows"
    type="failures"
    @option="onOption"
  >
    <template v-if="canUpdate" #button>
      <k-button
        icon="trash"
        @click="$refs.flushDialog.open()"
      >
        {{ $t('retour.failures.clear') }}
      </k-button>
    </template>

    <template #dialogs>
      <!-- remove dialog -->
      <k-remove-dialog
        ref="removeDialog"
        :submit-button="$t('delete')"
        @submit="onRemove"
      >
        <k-text>{{ $t('field.structure.delete.confirm') }}</k-text>
      </k-remove-dialog>

      <!-- flush dialog -->
      <k-remove-dialog
        ref="flushDialog"
        :submit-button="$t('retour.failures.clear')"
        @submit="onFlush"
      >
        <k-text>{{ $t('retour.failures.clear.confirm') }}</k-text>
      </k-remove-dialog>
    </template>

  </retour-table>
</template>

<script>
import permissions from "../../mixins/permissions.js";

import Table from "../Table/Table.vue";

export default {
  mixins: [permissions],
  components: {
    "rt-table": Table
  },
  data() {
    return {
      row: null
    };
  },
  computed: {
    columns() {
      return {
        path: {
          label: this.$t("retour.failures.path"),
          type: "link",
          filter: true,
          width: "1/3"
        },
        referrer: {
          label: this.$t("retour.failures.referrer"),
          type: "link",
          filter: true,
          width: "1/3"
        },
        hits: {
          label: this.$t("retour.hits"),
          type: "count",
          width: "1/12",
          align: "right"
        }
      };
    },
    options() {
      if (this.canUpdate === false) {
        return false;
      }

      return [
        {
          text: this.$t("retour.failures.resolve"),
          icon: "add",
          click: "add"
        },
        {
          text: this.$t("remove"),
          icon: "trash",
          click: "remove"
        }
      ];
    },
    rows() {
      return this.$store.state.retour.data.failures;
    }
  },
  methods: {
    async onAdd(row) {
      await this.$router.push("#routes");
      this.$events.$emit("retour.resolve", { from: row.path });
    },
    async onFlush() {
      try {
        await this.$api.post("retour/log/flush");
        this.$refs.flushDialog.close();
        await this.$store.dispatch("retour/load");
        this.$store.dispatch("notification/success");

      } catch (error) {
        this.$store.dispatch("notification/error", error);
      }
    },
    onOption(option, row) {
      switch (option) {
        case "add":
          return this.onAdd(row);
        case "remove":
          this.row = row;
          return this.$refs.removeDialog.open();
          return this.onRemove(row);
      }
    },
    async onRemove() {
      await this.$api.delete("retour/failures", {
        path: this.row.path,
        referrer: this.row.referrer
      });
      this.$refs.removeDialog.close();
      await this.$store.dispatch("retour/load");
      this.$store.dispatch("notification/success");
      this.row = null;
    }
  }
}
</script>