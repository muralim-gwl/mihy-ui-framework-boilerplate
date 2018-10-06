import {
  getLabel,
  getTextField,
  getCommonSubHeader
} from "mihy-ui-framework/ui-config/screens/specs/utils";
import "./index.css";

import { getQueryArg } from "mihy-ui-framework/ui-utils/commons";
import { handleScreenConfigurationFieldChange as handleField } from "mihy-ui-framework/ui-redux/screen-configuration/actions";
import get from "lodash/get";

const queryValue = getQueryArg(window.location.href, "purpose");

export const getTooltip = (children, toolTipProps) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      label: children,
      toolTip: {
        componentPath: "Tooltip",
        props: { ...toolTipProps },
        children: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "info"
          }
        }
      }
    }
  };
};

export const getCheckbox = (content, props = {}) => {
  return {
    uiFramework: "custom-atoms-local",
    componentPath: "Checkbox",
    props: {
      content,
      ...props
    }
  };
};

export const getUploadFile = {
  uiFramework: "custom-molecules",
  componentPath: "DocumentList",
  props: {
    documents: [
      {
        name: "Upload Document"
      }
    ]
  }
};

export const getUploadFilesMultiple = () => {
  return {
    uiFramework: "custom-molecules-local",
    componentPath: "UploadMultipleFiles",
    props: {
      maxFiles: 4
    }
  };
};

export const getRadioButtonGroup = buttons => {
  return {
    uiFramework: "custom-molecules",
    componentPath: "RadioGroup",
    props: {
      buttons
    }
  };
};
export const getRadioGroupWithLabel = (label, labelKey, buttons) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      alignItems: "center"
    },

    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        children: {
          div: getLabel(label, labelKey, {
            style: {
              fontSize: "14px"
            }
          })
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 8
        },
        children: {
          div: getRadioButtonGroup(buttons)
        }
      }
    }
  };
};

export const getApplicationNoContainer = number => {
  return {
    uiFramework: "custom-atoms-local",
    componentPath: "ApplicationNoContainer",
    props: {
      number
    }
  };
};

export const getContainerWithElement = (children, props = {}) => {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children,
    props: {
      ...props
    }
  };
};

export const transformById = (payload, id) => {
  return (
    payload &&
    payload.reduce((result, item) => {
      result[item[id]] = {
        ...item
      };

      return result;
    }, {})
  );
};

export const getTranslatedLabel = (labelKey, localizationLabels) => {
  let translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (
      translatedLabel &&
      typeof translatedLabel === "object" &&
      translatedLabel.hasOwnProperty("message")
    )
      translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

export const getApprovalTextField = () => {
  if (queryValue === "reject") {
    return getTextField("Comments", "Enter rejection Comments", false, "");
  } else if (queryValue === "cancel") {
    return getTextField("Comments", "Enter Cancellation Comments", false, "");
  } else {
    return getTextField("Comments", "Enter Approval Comments", false, "");
  }
};

export const getSubHeaderLabel = () => {
  if (queryValue === "reject") {
    return getCommonSubHeader("Rejection CheckList");
  } else if (queryValue === "cancel") {
    return {};
  } else {
    return getCommonSubHeader("Approve Checklist");
  }
};

export const getFooterButtons = () => {
  if (queryValue === "reject") {
    return getLabel(
      "REJECT APPLICATION",
      "TL_REJECTION_CHECKLIST_BUTTON_REJ_APPL"
    );
  } else if (queryValue === "cancel") {
    return getLabel("CANCEL TRADE LICENSE", "TL_COMMON_BUTTON_CANCEL_LICENSE");
  } else {
    return getLabel(
      "APPROVE APPLICATION",
      "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_APPL"
    );
  }
};

export const onClickNextButton = () => {
  switch (queryValue) {
    case "reject":
      return "/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=application&status=rejected&number=12345";
    case "cancel":
      return "/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=application&status=cancelled&number=12345";

    default:
      return "/landing/mihy-ui-framework/tradelicence/acknowledgement?purpose=approve&status=success&number=12345";
  }
};

export const onClickPreviousButton = () => {
  switch (queryValue) {
    case "reject":
      return "/landing/mihy-ui-framework/tradelicence/search-preview?role=approver&status=pending_approval";
    case "cancel":
      return "/landing/mihy-ui-framework/tradelicence/search-preview?role=approver&status=approved";
    default:
      return "/landing/mihy-ui-framework/tradelicence/search-preview?role=approver&status=pending_approval";
  }
};
export const getFeesEstimateCard = (header, fees, extra) => {
  return {
    uiFramework: "custom-molecules",
    componentPath: "FeesEstimateCard",
    props: {
      estimate: {
        header,
        fees,
        extra
      }
    }
  };
};

const style = {
  textfieldIcon: {
    position: "relative",
    top: "25px",
    left: "-249%"
  },
  headerIcon: {
    position: "relative",
    bottom: "2px"
  }
};

export const getIconStyle = key => {
  return style[key];
};

export const showHideAdhocPopup = (state, dispatch) => {
  let toggle = get(
    state.screenConfiguration.screenConfig["pay"],
    "components.adhocDialog.props.open",
    false
  );
  dispatch(handleField("pay", "components.adhocDialog", "props.open", !toggle));
};

export const getButtonVisibility = (role, status, button) => {
  if (status === "pending_payment" && button === "PROCEED TO PAYMENT")
    return true;
  if (
    status === "pending_approval" &&
    role === "approver" &&
    button === "APPROVE"
  )
    return true;
  if (
    status === "pending_approval" &&
    role === "approver" &&
    button === "REJECT"
  )
    return true;
  if (
    status === "approved" &&
    role === "approver" &&
    button === "CANCEL TRADE LICENSE"
  )
    return true;
  return false;
};
