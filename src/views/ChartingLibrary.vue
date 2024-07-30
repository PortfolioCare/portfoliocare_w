<template>
  <div class="h-dvh w-dvw" ref="chartContainer"></div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from "vue";
import Datafeed from "@/components/datafeed/datafeed";
import {
  TradingTerminalWidgetOptions,
  widget,
  LanguageCode,
  LibraryPineStudy,
  IPineStudyResult,
  StudyLinePlotPreferences,
  CustomIndicator,
  RawStudyMetaInfoId,
  StudyPlotType,
  ResolutionString,
  IChartingLibraryWidget,
} from "../../public/charting_library";
// import { isFirst } from "@/api/tradingview/tradingview";

// import { useUserStore } from "@/store/modules/user";
// import { getUserInfo } from "../../api/sys/user";

// const userStore = useUserStore();
function getLanguageFromURL() {
  const regex = new RegExp("[\\?&]lang=([^&#]*)");
  const results = regex.exec(window.location.search);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

const props = defineProps({
  symbol: {
    default: "AAPL",
    type: String,
  },
  interval: {
    default: "D",
    type: String,
  },
  libraryPath: {
    default: "/charting_library/",
    type: String,
  },
  chartsStorageUrl: {
    // default: 'http://localhost:10008/tradingview',
    default: "/basic-api/tradingview",
    type: String,
  },
  chartsStorageApiVersion: {
    default: "1.0",
    type: String,
  },
  clientId: {
    default: "tradingview.com",
    type: String,
  },
  userId: {
    default: "1",
    type: String,
  },
  fullscreen: {
    default: false,
    type: Boolean,
  },
  autosize: {
    default: true,
    type: Boolean,
  },
  studiesOverrides: {
    type: Object,
  },
});

const chartContainer = ref();
let chartWidget: IChartingLibraryWidget;

onMounted(async () => {
  // const isFirstIn = await isFirst({ clientId: props.clientId });

  const widgetOptions: TradingTerminalWidgetOptions = {
    timezone: "Asia/Shanghai",
    load_last_chart: true,
    datafeed: Datafeed,
    interval: props.interval as ResolutionString,
    container: chartContainer.value,
    library_path: props.libraryPath,

    locale: (getLanguageFromURL() || "zh") as LanguageCode,
    // charts_storage_url: props.chartsStorageUrl,
    // charts_storage_api_version: props.chartsStorageApiVersion,
    client_id: props.clientId,
    user_id: "userStore.getUserInfo.userId",
    fullscreen: props.fullscreen,
    autosize: props.autosize,
    studies_overrides: props.studiesOverrides,
    // eslint-disable-next-line no-dupe-keys
    disabled_features: [
      "use_localstorage_for_settings",
      "open_account_manager",
      "trading_account_manager",
      "order_panel",
      "order_info",
      "adaptive_logo",
    ],
    // eslint-disable-next-line no-dupe-keys
    enabled_features: [
      "hide_right_toolbar",
      "pre_post_market_sessions",
      "show_symbol_logos",
      "show_exchange_logos",
      "seconds_resolution",
      "tick_resolution",
      "chart_template_storage",
      "secondary_series_extend_time_scale",
      // 'show_percent_option_for_right_margin',
      // 'display_data_mode',
      // 'items_favoriting',
      // 'hide_left_toolbar_by_default',
      "study_templates",
      // 'pre_post_market_sessions',
      "show_object_tree",
      "dom_widget",
    ],
    /* Within the Widget constructor options */
    custom_indicators_getter: (PineJS) => {
      return Promise.resolve<CustomIndicator[]>([
        /* Requesting data for another ticker */
        {
          name: "Equity",
          metainfo: {
            _metainfoVersion: 51,
            id: "Equity@tv-basicstudies-1" as RawStudyMetaInfoId,
            description: "Equity",
            shortDescription: "Equity",
            is_price_study: true,
            isCustomIndicator: true,
            format: {
              type: "price",
              // Precision is set to one digit, e.g. 777.7
              precision: 1,
            },

            plots: [{ id: "plot_0", type: "line" }],
            defaults: {
              styles: {
                plot_0: {
                  linestyle: 0,
                  visible: true,

                  // Make the line thinner
                  linewidth: 1,

                  // Plot type is Line
                  plottype: 2 as StudyLinePlotPreferences["plottype"],

                  // Show price line
                  trackPrice: true,

                  // Set the plotted line color to dark red
                  color: "#880000",
                },
              },

              inputs: {},
            },
            styles: {
              plot_0: {
                // Output name will be displayed in the Style window
                title: "Equity value",
                histogramBase: 0,
              },
            },
            inputs: [],
          },

          constructor: function (this: LibraryPineStudy<IPineStudyResult>) {
            this.init = function (context, inputCallback) {
              this._context = context;
              this._input = inputCallback;

              const symbol = "#EQUITY"; // #EQUITY should be replaced with the symbol you want to resolve
              this._context.new_sym(symbol, PineJS.Std.period(this._context));
            };

            this.main = function (context, inputCallback) {
              this._context = context;
              this._input = inputCallback;
              // Select the main symbol
              this._context.select_sym(0);
              const mainSymbolTime = this._context.new_var(this._context.symbol.time);

              // Select the secondary symbol ("#EQUITY")
              this._context.select_sym(1);
              const secondarySymbolTime = this._context.new_var(this._context.symbol.time);

              // Align the times of the secondary symbol to the main symbol
              const secondarySymbolClose = this._context.new_var(PineJS.Std.close(this._context));
              const alignedClose = secondarySymbolClose.adopt(
                secondarySymbolTime,
                mainSymbolTime,
                1
              );

              // Select the main symbol again
              this._context.select_sym(0);

              return [alignedClose];
            };
          },
        },
      ]);
    },
  };
  // if (isFirstIn) {
  widgetOptions.symbol = "SH:600000/RMB";
  // }
  chartWidget = new widget(widgetOptions);

  chartWidget.onChartReady(() => {
    chartWidget.headerReady().then(() => {
      const button = chartWidget.createButton();

      button.setAttribute("title", "Click to show a notification popup");
      button.classList.add("apply-common-tooltip");

      button.addEventListener("click", () =>
        chartWidget.showNoticeDialog({
          title: "Notification",
          body: "TradingView Charting Library API works correctly",
          callback: () => {
            // eslint-disable-next-line no-console
            console.log("Noticed!");
          },
        })
      );

      button.innerHTML = "Check API";

      var button1 = chartWidget.createButton();
      button1.setAttribute("title", "My custom button tooltip");
      button1.addEventListener("click", function () {
        chartWidget.activeChart().executeActionById("drawingToolbarAction");
      });
      button1.textContent = "绘图";
    });
  });
});

onUnmounted(() => {
  if (chartWidget !== null) {
    chartWidget.remove();
  }
});
</script>
