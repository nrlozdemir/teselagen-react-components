import ReactMarkdown from "react-markdown";
import ReactPlayground from "./ReactPlayground";
import CollapsibleCard from "./examples/CollapsibleCard";
import MenuBar from "./examples/MenuBar";
import HotkeysDialog from "./examples/HotkeysDialog";
import DataTableExample from "./examples/DataTable";
import FormComponents from "./DemoComponents/FormComponents";
import WithDialog from "./examples/WithDialog";
import Toastr from "./examples/Toastr";
import showConfirmationDialogDemo from "./examples/showConfirmationDialogDemo";
import showConfirmationDialog from "../../src/showConfirmationDialog";
import ResizableDraggableDialogDemo from "./examples/ResizableDraggableDialog";
import ResizableDraggableDialog from "../../src/ResizableDraggableDialog";

import CustomIcons from "./examples/CustomIcons";
import CSSOnlyToolTip from "./examples/CSSOnlyToolTip";
import S3Uploader from "./examples/S3Uploader";
import SimpleTable from "./examples/SimpleTable";
import TgSelectDemo from "./examples/TgSelectDemo";
import InfoHelper from "./examples/InfoHelper";
import Loading from "./examples/Loading";
import DownloadLink from "./examples/DownloadLink";
import DemoNav from "./DemoNav";
import DemoHeader from "./DemoHeader";
import { withTableParams, DataTable, PagingTool } from "../../src";
import Uploader from "../../src/FormComponents/Uploader";
import { FileUploadField } from "../../src/FormComponents";
import FillWindowExample from "./examples/FillWindow";
import * as customIcons from "../../src/customIcons";


import S3Download from "../../src/utils/S3Download";
import magicDownload from "../../src/DownloadLink/magicDownload";
import FillWindow from "../../src/FillWindow";
import TgSelect from "../../src/TgSelect";
import Timeline from "../../src/Timeline";
import TimelineEvent from "../../src/Timeline/TimelineEvent";
import TimelineDemo from "./examples/TimelineDemo";
import IntentTextDemo from "./examples/IntentText";
import ScrollToTopDemo from "./examples/ScrollToTop";
import IntentText from "../../src/IntentText";
import {
  CmdButton,
  CmdCheckbox,
  CmdDiv,
  CmdSwitch
} from "../../src/utils/commandControls";
import ScrollToTop from "../../src/ScrollToTop";

import "./style.css";
import React, { Component } from "react";
import { render } from "react-dom";
import {
  HashRouter as Router,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";
import { reduxForm } from "redux-form";
import store from "./store";
import {
  Dialog,
  MenuItem,
  FocusStyleManager,
  Intent,
  KeyCombo,
  Checkbox,
  Button,
  Icon,
  Classes
} from "@blueprintjs/core";
import renderToggle from "./renderToggle";
import Chance from "chance";
import times from "lodash/times";
import {
  createMenu,
  showContextMenu,
  showCommandContextMenu,
  commandMenuEnhancer
} from "../../src/utils/menuUtils";
import {
  genericCommandFactory,
  getCommandHotkeys,
  getCommandHotkeyHandlers
} from "../../src/utils/commandUtils";
import { withHotkeys, getHotkeyProps } from "../../src/utils/hotkeyUtils";

FocusStyleManager.onlyShowFocusOnTabs();

const demos = {
  DataTable: {
    demo: DataTableExample,
    scope: {
      MenuItem,
      Dialog,
      withTableParams,
      DataTable,
      ReactMarkdown,
      PagingTool,
      renderToggle,
      Router,
      withRouter,
      Checkbox,
      store,
      Chance,
      times,
      Icon,
      Classes
    },
    childLinks: {
      SimpleTable: {
        demo: SimpleTable
      }
    },
    noLiveCode: true
  },
  InfoHelper: {
    demo: InfoHelper,
    scope: {
      Classes
    },
    props: [
      {
        name: "className",
        description:
          "The CSS class name passed to the Button (if Popover) or Tooltip",
        type: "string"
      },
      {
        name: "isPopover",
        description:
          "If true then tooltip will be shown on click and false will show tooltip on hover",
        type: "boolean"
      },
      {
        name: "children",
        type: "React Element",
        description: "The contents of the Popover or Tooltip"
      },
      {
        name: "content",
        description:
          "A different way to specify the contents of the Popover or Tooltip",
        type: "React Element"
      },
      {
        name: "size",
        description: "Size of the icon",
        type: "number"
      },
      {
        name: "icon",
        type: "string",
        description: "Override the default info icon."
      }
    ]
  },
  TgSelect: {
    demo: TgSelectDemo,
    scope: {
      Classes,
      TgSelect,
      Icon,
      renderToggle
    },
    props: [
      {
        name: "className",
        description:
          "The CSS class name passed to the Button (if Popover) or Tooltip",
        type: "string"
      }
    ]
  },
  CollapsibleCard: {
    demo: CollapsibleCard,
    props: [
      {
        name: "title",
        description: "Header for the card",
        type: "string | React Element"
      },
      {
        name: "icon",
        description: "BlueprintJS icon to be displayed in card header",
        type: "string"
      },
      {
        name: "icon",
        description: "Custom icon to be displayed in card header",
        type: "React Element"
      },
      {
        name: "openTitleElements",
        type: "React Element",
        description: "Items to be displayed in header when card is open"
      },
      {
        name: "noCard",
        description: "Removes card styling",
        type: "boolean"
      },
      {
        name: "children",
        type: "React Element",
        description: "Content of the card when open"
      }
    ]
  },
  "Hotkeys and HotkeysDialog": {
    demo: HotkeysDialog,
    scope: {
      KeyCombo
    },
    props: [
      {
        name: "hotkeySets",
        description:
          "Object holding hotkey sets (keys are set names, values are hotkey objects)",
        type: "Object"
      },
      {
        name: "isOpen",
        description: "Flag indicating whether the dialog should be visible",
        type: "boolean"
      },
      {
        name: "onClose",
        description:
          "Callback to run when the user attempts to close the dialog",
        type: "function"
      }
    ]
  },
  MenuBar: {
    demo: MenuBar,
    scope: {
      withHotkeys,
      getHotkeyProps,
      createMenu,
      CmdButton,
      CmdCheckbox,
      CmdDiv,
      CmdSwitch,
      showContextMenu,
      showCommandContextMenu,
      commandMenuEnhancer,
      genericCommandFactory,
      getCommandHotkeys,
      getCommandHotkeyHandlers
    },
    props: [
      {
        name: "menu",
        description:
          "Menu structure. Array of objects with `text` and `submenu` properties.",
        type: "Array"
      }
    ]
  },
  Loading: {
    demo: Loading,
    props: [
      {
        name: "className",
        description: "The CSS class name of the loading component",
        type: "string"
      },
      {
        name: "style",
        description: "Style properties for the loading component",
        type: "string"
      },
      {
        name: "children",
        type: "React Element",
        description: "Returned when loading is false"
      },
      {
        name: "loading",
        description:
          "Only used when children are passed. If true then children are hidden, false children are rendered",
        type: "string"
      },
      {
        name: "bounce",
        description: "Displays the bouncing lines style loader",
        type: "boolean"
      },
      {
        name: "inDialog",
        type: "boolean",
        description: "Sets a min-height of 200 and sets bounce to true"
      }
    ]
  },
  DownloadLink: {
    demo: DownloadLink,
    props: [
      {
        name: "filename",
        description: "Name of the downloaded file",
        type: "string"
      },
      {
        name: "fileString",
        description: "Contents of the downloaded file",
        type: "string"
      },
      {
        name: "getFileString",
        type: "function",
        description: "A function that will return the contents to be downloaded"
      }
    ]
  },
  FormComponents: {
    DemoComponent: FormComponents
  },
  withDialog: {
    demo: WithDialog,
    scope: {
      renderToggle,
      Classes,
      Provider,
      store
    }
  },
  toastr: {
    demo: Toastr
  },
  showConfirmationDialog: {
    scope: {
      showConfirmationDialog,
      Intent,
      renderToggle
    },
    demo: showConfirmationDialogDemo
  },

  // MultiSelectSideBySide: {
  //   scope: {
  //     MultiSelectSideBySide,
  //     Component,
  //     renderToggle,
  //     HTMLSelect
  //   },
  //   demo: MultiSelectSideBySideDemo
  // },
  ResizableDraggableDialog: {
    scope: {
      ResizableDraggableDialog,
      renderToggle,
      Component,
      Classes
      // HTMLSelect,
    },
    demo: ResizableDraggableDialogDemo
  },
  customIcons: {
    scope: {
      renderToggle,
      customIcons
    },
    demo: CustomIcons
  },
  "CSS-Only ToolTip": {
    scope: {
      renderToggle
    },
    demo: CSSOnlyToolTip
  },
  S3Uploader: {
    scope: {
      renderToggle,
      Provider,
      store,
      reduxForm,
      Uploader,
      FileUploadField,
      Button,
      S3Download,
      magicDownload
    },
    demo: S3Uploader
  },
  FillWindow: {
    demo: FillWindowExample,
    scope: {
      renderToggle,
      FillWindow
    }
  },
  Timeline: {
    demo: TimelineDemo,
    scope: {
      renderToggle,
      Timeline,
      TimelineEvent
    }
  },
  IntentText: {
    demo: IntentTextDemo,
    scope: {
      renderToggle,
      IntentText
    }
  },
  ScrollToTop: {
    demo: ScrollToTopDemo,
    scope: {
      renderToggle,
      ScrollToTop
    }
  }
  // fonticons: {
  //   demo: FontIconsDemo,
  // }
};

const demoPropsSchema = [
  {
    displayName: "Name",
    path: "name",
    width: 200,
    render: v => <span style={{ color: "#5bc0de" }}>{v}</span>
  },
  {
    displayName: "Type",
    width: 200,
    path: "type",
    render: v => <span style={{ color: "#ff758d" }}>{v}</span>
  },
  {
    displayName: "Description",
    path: "description"
  }
];

function DemoComponentWrapper(
  { demo: Demo, DemoComponent, scope, props = [], noLiveCode },
  demoTitle
) {
  return () => {
    let component;
    if (DemoComponent) {
      component = <DemoComponent />;
    } else {
      component = (
        <div>
          {
            <ReactPlayground
              codeText={Demo}
              scope={scope}
              noLiveCode={noLiveCode}
            />
          }
          {!!props.length && (
            <React.Fragment>
              <h6
                style={{
                  marginTop: 25,
                  marginBottom: 15
                }}
              >
                Properties
              </h6>
              <DataTable
                formName="demoProps"
                entities={props}
                isSimple
                schema={demoPropsSchema}
              />
            </React.Fragment>
          )}
        </div>
      );
    }
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            marginBottom: 20,
            justifyContent: "space-between"
          }}
        >
          <h4>{demoTitle}</h4>
          <a
            href={
              "https://github.com/TeselaGen/teselagen-react-components/tree/master/src"
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            Component Source
          </a>
        </div>
        {component}
      </React.Fragment>
    );
  };
}

const Demo = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <DemoHeader />
          <div
            style={{
              display: "flex",
              padding: 40,
              maxWidth: "100vw"
            }}
          >
            <DemoNav demos={demos} />
            <div
              style={{
                overflow: "auto",
                padding: 10
              }}
            >
              <Route
                exact
                path="/"
                render={() => <Redirect to={Object.keys(demos)[0]} />}
              />
              {Object.keys(demos).map(function(key, index) {
                const demo = demos[key];
                return (
                  <React.Fragment key={key}>
                    <Route
                      exact
                      path={`/${key}`}
                      url={demo.url}
                      component={DemoComponentWrapper(demo, key)}
                    />
                    {Object.keys(demo.childLinks || []).map(
                      (childKey, index2) => {
                        const childDemo = demo.childLinks[childKey];
                        return (
                          <Route
                            exact
                            key={key + childKey + index + index2}
                            path={`/${key}/${childKey}`}
                            url={childDemo.url}
                            component={DemoComponentWrapper(
                              childDemo,
                              childKey
                            )}
                          />
                        );
                      }
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
};

render(<Demo />, document.querySelector("#demo"));
