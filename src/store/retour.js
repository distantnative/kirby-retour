export default {
  namespaced: true,
  state: {
    data: {
      redirects: [],
      fails: [],
      stats: []
    },
    view: {
      table: "redirects",
      from: null,
      to: null,
      all: false
    },
    options: {
      headers: [],
      logs: false,
      deleteAfter: null
    }
  },
  getters: {
    dates: state => {
      return {
        from: state.view.from.format("YYYY-MM-DD"),
        to: state.view.to.format("YYYY-MM-DD")
      };
    },
    days: state => {
      return state.view.to.diff(state.view.from, "day");
    },
    view: state => {
      const from = state.view.from;
      const to = state.view.to;

      if (state.view.all === true) {
        return "all";
      }

      if (
        from.isSame(to, "date") &&
        from.isSame(to, "month") &&
        from.isSame(to, "year")
      ) {
        return "day";
      }

      if (
        from.isSame(to, "month") &&
        from.isSame(to, "year") &&
        from.date() === 1 &&
        to.date() === to.daysInMonth()
      ) {
        return "month";
      }

      if (
        to.day() === 0 && from.isSame(to.subtract(6, "day").startOf("day"))
      ) {
        return "week";
      } else if (
        from.isSame(to.subtract(to.day() - 1, "day").startOf("day"))
      ) {
        return "week";
      }


      if (
        from.isSame(to, "year") &&
        from.date() === 1 &&
        from.month() === 0 &&
        to.date() === 31 &&
        to.month() === 11
      ) {
        return "year";
      }

      return false;
    }
  },
  mutations: {
    SET_DATA(state, [type, data]) {
      this._vm.$set(state.data, type, data);
    },
    SET_OPTIONS(state, data) {
      this._vm.$set(state, "options", data);
    },
    SET_TABLE(state, table) {
      state.view.table = table;
    },
    SET_TIMEFRAME(state, dates) {
      state.view.from = dates.from;
      state.view.to = dates.to;
    }
  },
  actions: {
    /* Setters */
    all(context) {
      this._vm.$api.get("retour/logs/all").then(response => {
        context.dispatch("timeframe", {
          from: this._vm.$library.dayjs(response.first.date),
          to: this._vm.$library.dayjs(response.last.date)
        });
        context.state.view.all = true;
      })
    },
    table(context, table) {
      context.commit("SET_TABLE", table);
    },
    timeframe(context, dates) {
      context.commit("SET_TIMEFRAME", dates);
      context.state.view.all = false;
      context.dispatch("redirects");

      if (context.state.options.logs === true) {
        context.dispatch("fails");
        context.dispatch("stats");
      }
    },

    /* Initializers */
    init(context) {
      context.commit("SET_TIMEFRAME", {
        from: this._vm.$library.dayjs().startOf("month"),
        to: this._vm.$library.dayjs().endOf("month")
      });
    },
    load(context) {
      context.dispatch("system").then(() => {
        context.dispatch("redirects");

        if (context.state.options.logs === true) {
          context.dispatch("fails");
          context.dispatch("stats");
          this._vm.$api.post("retour/logs/purge");
        }
      });
    },

    /* Loaders */
    fails(context) {
      return this._vm.$api.get("retour/fails", context.getters["dates"]).then(response => {
        context.commit("SET_DATA", ["fails", response]);
      });
    },
    redirects(context) {
      return this._vm.$api.get("retour/redirects", context.getters["dates"]).then(response => {
        context.commit("SET_DATA", ["redirects", response]);
      });
    },
    stats(context) {
      const view = context.getters["view"];
      return this._vm.$api.get("retour/stats/", {
        view: view ? view : "custom",
        ...context.getters["dates"]
      }).then(response => {
        context.commit("SET_DATA", ["stats", response]);
      });
    },
    system(context) {
      return this._vm.$api.get("retour/system").then(response => {
        context.commit("SET_OPTIONS", response);
      });
    }
  }
};
