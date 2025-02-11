import autocomplete from "discourse/lib/autocomplete";
import bootbox from "bootbox";
import { getOwner } from "discourse-common/lib/get-owner";
import deprecated from "discourse-common/lib/deprecated";

export default {
  name: "jquery-plugins",
  initialize() {
    // Settings for bootbox
    bootbox.animate(false);
    bootbox.backdrop(true);

    // Monkey-patching simple alerts
    const originalAlert = bootbox.alert;
    bootbox.alert = function () {
      if (arguments.length === 1) {
        const dialog = getOwner(this).lookup("service:dialog");
        if (dialog) {
          deprecated(
            "`bootbox.alert` is deprecated, please use the dialog service instead.",
            {
              dropFrom: "3.1.0.beta5",
            }
          );
          return dialog.alert(arguments[0]);
        }
      }
      return originalAlert(...arguments);
    };

    // adding deprecation notice for all other dialogs
    const originalDialog = bootbox.dialog;
    bootbox.dialog = function () {
      deprecated(
        "`bootbox` is now deprecated, please use the dialog service instead.",
        {
          dropFrom: "3.1.0.beta5",
        }
      );
      return originalDialog(...arguments);
    };

    // Initialize the autocomplete tool
    $.fn.autocomplete = autocomplete;
  },
};
