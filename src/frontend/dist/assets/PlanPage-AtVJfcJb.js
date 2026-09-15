import { j as jsxRuntimeExports, c as cn, r as reactExports, u as useNavigate, b as ue } from "./index-BEzjik7-.js";
import { d as cva, c as createLucideIcon, X, u as useAuth, e as useUserProfile, f as useMyProgress, g as useDerivedProgress, L as Layout, m as motion, h as useActor, i as useQuery, j as useSetDeveloperMode, D as Dumbbell, k as createActor } from "./proxy-DjqoCLfy.js";
import { S as Slot$1, u as useComposedRefs, F as Flame, A as AnimatePresence } from "./index-LXIWLPOC.js";
import { u as useLayoutEffect2, d as useControllableState, e as useId, P as Primitive, f as composeEventHandlers, g as Portal$1, h as hideOthers, c as createContextScope, R as ReactRemoveScroll, i as useFocusGuards, F as FocusScope, D as DismissableLayer, a as createSlot, j as createContext2, I as Input } from "./Combination-BoY6Krli.js";
import { C as CircleCheck, L as Lock } from "./lock-B30AGLy6.js";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot$1 : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
const Play = createLucideIcon("play", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
  ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
  ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
  ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
];
const Trophy = createLucideIcon("trophy", __iconNode);
function useStateMachine(initialState, machine) {
  return reactExports.useReducer((state, event) => {
    const nextState = machine[state][event];
    return nextState ?? state;
  }, initialState);
}
var Presence = (props) => {
  const { present, children } = props;
  const presence = usePresence(present);
  const child = typeof children === "function" ? children({ present: presence.isPresent }) : reactExports.Children.only(children);
  const ref = useComposedRefs(presence.ref, getElementRef(child));
  const forceMount = typeof children === "function";
  return forceMount || presence.isPresent ? reactExports.cloneElement(child, { ref }) : null;
};
Presence.displayName = "Presence";
function usePresence(present) {
  const [node, setNode] = reactExports.useState();
  const stylesRef = reactExports.useRef(null);
  const prevPresentRef = reactExports.useRef(present);
  const prevAnimationNameRef = reactExports.useRef("none");
  const initialState = present ? "mounted" : "unmounted";
  const [state, send] = useStateMachine(initialState, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  reactExports.useEffect(() => {
    const currentAnimationName = getAnimationName(stylesRef.current);
    prevAnimationNameRef.current = state === "mounted" ? currentAnimationName : "none";
  }, [state]);
  useLayoutEffect2(() => {
    const styles = stylesRef.current;
    const wasPresent = prevPresentRef.current;
    const hasPresentChanged = wasPresent !== present;
    if (hasPresentChanged) {
      const prevAnimationName = prevAnimationNameRef.current;
      const currentAnimationName = getAnimationName(styles);
      if (present) {
        send("MOUNT");
      } else if (currentAnimationName === "none" || (styles == null ? void 0 : styles.display) === "none") {
        send("UNMOUNT");
      } else {
        const isAnimating = prevAnimationName !== currentAnimationName;
        if (wasPresent && isAnimating) {
          send("ANIMATION_OUT");
        } else {
          send("UNMOUNT");
        }
      }
      prevPresentRef.current = present;
    }
  }, [present, send]);
  useLayoutEffect2(() => {
    if (node) {
      let timeoutId;
      const ownerWindow = node.ownerDocument.defaultView ?? window;
      const handleAnimationEnd = (event) => {
        const currentAnimationName = getAnimationName(stylesRef.current);
        const isCurrentAnimation = currentAnimationName.includes(CSS.escape(event.animationName));
        if (event.target === node && isCurrentAnimation) {
          send("ANIMATION_END");
          if (!prevPresentRef.current) {
            const currentFillMode = node.style.animationFillMode;
            node.style.animationFillMode = "forwards";
            timeoutId = ownerWindow.setTimeout(() => {
              if (node.style.animationFillMode === "forwards") {
                node.style.animationFillMode = currentFillMode;
              }
            });
          }
        }
      };
      const handleAnimationStart = (event) => {
        if (event.target === node) {
          prevAnimationNameRef.current = getAnimationName(stylesRef.current);
        }
      };
      node.addEventListener("animationstart", handleAnimationStart);
      node.addEventListener("animationcancel", handleAnimationEnd);
      node.addEventListener("animationend", handleAnimationEnd);
      return () => {
        ownerWindow.clearTimeout(timeoutId);
        node.removeEventListener("animationstart", handleAnimationStart);
        node.removeEventListener("animationcancel", handleAnimationEnd);
        node.removeEventListener("animationend", handleAnimationEnd);
      };
    } else {
      send("ANIMATION_END");
    }
  }, [node, send]);
  return {
    isPresent: ["mounted", "unmountSuspended"].includes(state),
    ref: reactExports.useCallback((node2) => {
      stylesRef.current = node2 ? getComputedStyle(node2) : null;
      setNode(node2);
    }, [])
  };
}
function getAnimationName(styles) {
  return (styles == null ? void 0 : styles.animationName) || "none";
}
function getElementRef(element) {
  var _a, _b;
  let getter = (_a = Object.getOwnPropertyDescriptor(element.props, "ref")) == null ? void 0 : _a.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = (_b = Object.getOwnPropertyDescriptor(element, "ref")) == null ? void 0 : _b.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}
var DIALOG_NAME = "Dialog";
var [createDialogContext] = createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = (props) => {
  const {
    __scopeDialog,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    modal = true
  } = props;
  const triggerRef = reactExports.useRef(null);
  const contentRef = reactExports.useRef(null);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: onOpenChange,
    caller: DIALOG_NAME
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DialogProvider,
    {
      scope: __scopeDialog,
      triggerRef,
      contentRef,
      contentId: useId(),
      titleId: useId(),
      descriptionId: useId(),
      open,
      onOpenChange: setOpen,
      onOpenToggle: reactExports.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
      modal,
      children
    }
  );
};
Dialog$1.displayName = DIALOG_NAME;
var TRIGGER_NAME = "DialogTrigger";
var DialogTrigger = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...triggerProps } = props;
    const context = useDialogContext(TRIGGER_NAME, __scopeDialog);
    const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": context.open,
        "aria-controls": context.contentId,
        "data-state": getState(context.open),
        ...triggerProps,
        ref: composedTriggerRef,
        onClick: composeEventHandlers(props.onClick, context.onOpenToggle)
      }
    );
  }
);
DialogTrigger.displayName = TRIGGER_NAME;
var PORTAL_NAME = "DialogPortal";
var [PortalProvider, usePortalContext] = createDialogContext(PORTAL_NAME, {
  forceMount: void 0
});
var DialogPortal$1 = (props) => {
  const { __scopeDialog, forceMount, children, container } = props;
  const context = useDialogContext(PORTAL_NAME, __scopeDialog);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeDialog, forceMount, children: reactExports.Children.map(children, (child) => /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children: child }) })) });
};
DialogPortal$1.displayName = PORTAL_NAME;
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(OVERLAY_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
    return context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlayImpl, { ...overlayProps, ref: forwardedRef }) }) : null;
  }
);
DialogOverlay$1.displayName = OVERLAY_NAME;
var Slot = createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...overlayProps } = props;
    const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactRemoveScroll, { as: Slot, allowPinchZoom: true, shards: [context.contentRef], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          "data-state": getState(context.open),
          ...overlayProps,
          ref: forwardedRef,
          style: { pointerEvents: "auto", ...overlayProps.style }
        }
      ) })
    );
  }
);
var CONTENT_NAME = "DialogContent";
var DialogContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeDialog);
    const { forceMount = portalContext.forceMount, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.modal ? /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentModal, { ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContentNonModal, { ...contentProps, ref: forwardedRef }) });
  }
);
DialogContent$1.displayName = CONTENT_NAME;
var DialogContentModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
    reactExports.useEffect(() => {
      const content = contentRef.current;
      if (content) return hideOthers(content);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: composedRefs,
        trapFocus: context.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: composeEventHandlers(props.onCloseAutoFocus, (event) => {
          var _a;
          event.preventDefault();
          (_a = context.triggerRef.current) == null ? void 0 : _a.focus();
        }),
        onPointerDownOutside: composeEventHandlers(props.onPointerDownOutside, (event) => {
          const originalEvent = event.detail.originalEvent;
          const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
          const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
          if (isRightClick) event.preventDefault();
        }),
        onFocusOutside: composeEventHandlers(
          props.onFocusOutside,
          (event) => event.preventDefault()
        )
      }
    );
  }
);
var DialogContentNonModal = reactExports.forwardRef(
  (props, forwardedRef) => {
    const context = useDialogContext(CONTENT_NAME, props.__scopeDialog);
    const hasInteractedOutsideRef = reactExports.useRef(false);
    const hasPointerDownOutsideRef = reactExports.useRef(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DialogContentImpl,
      {
        ...props,
        ref: forwardedRef,
        trapFocus: false,
        disableOutsidePointerEvents: false,
        onCloseAutoFocus: (event) => {
          var _a, _b;
          (_a = props.onCloseAutoFocus) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            if (!hasInteractedOutsideRef.current) (_b = context.triggerRef.current) == null ? void 0 : _b.focus();
            event.preventDefault();
          }
          hasInteractedOutsideRef.current = false;
          hasPointerDownOutsideRef.current = false;
        },
        onInteractOutside: (event) => {
          var _a, _b;
          (_a = props.onInteractOutside) == null ? void 0 : _a.call(props, event);
          if (!event.defaultPrevented) {
            hasInteractedOutsideRef.current = true;
            if (event.detail.originalEvent.type === "pointerdown") {
              hasPointerDownOutsideRef.current = true;
            }
          }
          const target = event.target;
          const targetIsTrigger = (_b = context.triggerRef.current) == null ? void 0 : _b.contains(target);
          if (targetIsTrigger) event.preventDefault();
          if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) {
            event.preventDefault();
          }
        }
      }
    );
  }
);
var DialogContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, ...contentProps } = props;
    const context = useDialogContext(CONTENT_NAME, __scopeDialog);
    const contentRef = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, contentRef);
    useFocusGuards();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FocusScope,
        {
          asChild: true,
          loop: true,
          trapped: trapFocus,
          onMountAutoFocus: onOpenAutoFocus,
          onUnmountAutoFocus: onCloseAutoFocus,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            DismissableLayer,
            {
              role: "dialog",
              id: context.contentId,
              "aria-describedby": context.descriptionId,
              "aria-labelledby": context.titleId,
              "data-state": getState(context.open),
              ...contentProps,
              ref: composedRefs,
              onDismiss: () => context.onOpenChange(false)
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TitleWarning, { titleId: context.titleId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionWarning, { contentRef, descriptionId: context.descriptionId })
      ] })
    ] });
  }
);
var TITLE_NAME = "DialogTitle";
var DialogTitle$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...titleProps } = props;
    const context = useDialogContext(TITLE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.h2, { id: context.titleId, ...titleProps, ref: forwardedRef });
  }
);
DialogTitle$1.displayName = TITLE_NAME;
var DESCRIPTION_NAME = "DialogDescription";
var DialogDescription$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...descriptionProps } = props;
    const context = useDialogContext(DESCRIPTION_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Primitive.p, { id: context.descriptionId, ...descriptionProps, ref: forwardedRef });
  }
);
DialogDescription$1.displayName = DESCRIPTION_NAME;
var CLOSE_NAME = "DialogClose";
var DialogClose = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeDialog, ...closeProps } = props;
    const context = useDialogContext(CLOSE_NAME, __scopeDialog);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        type: "button",
        ...closeProps,
        ref: forwardedRef,
        onClick: composeEventHandlers(props.onClick, () => context.onOpenChange(false))
      }
    );
  }
);
DialogClose.displayName = CLOSE_NAME;
function getState(open) {
  return open ? "open" : "closed";
}
var TITLE_WARNING_NAME = "DialogTitleWarning";
var [WarningProvider, useWarningContext] = createContext2(TITLE_WARNING_NAME, {
  contentName: CONTENT_NAME,
  titleName: TITLE_NAME,
  docsSlug: "dialog"
});
var TitleWarning = ({ titleId }) => {
  const titleWarningContext = useWarningContext(TITLE_WARNING_NAME);
  const MESSAGE = `\`${titleWarningContext.contentName}\` requires a \`${titleWarningContext.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${titleWarningContext.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${titleWarningContext.docsSlug}`;
  reactExports.useEffect(() => {
    if (titleId) {
      const hasTitle = document.getElementById(titleId);
      if (!hasTitle) console.error(MESSAGE);
    }
  }, [MESSAGE, titleId]);
  return null;
};
var DESCRIPTION_WARNING_NAME = "DialogDescriptionWarning";
var DescriptionWarning = ({ contentRef, descriptionId }) => {
  const descriptionWarningContext = useWarningContext(DESCRIPTION_WARNING_NAME);
  const MESSAGE = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${descriptionWarningContext.contentName}}.`;
  reactExports.useEffect(() => {
    var _a;
    const describedById = (_a = contentRef.current) == null ? void 0 : _a.getAttribute("aria-describedby");
    if (descriptionId && describedById) {
      const hasDescription = document.getElementById(descriptionId);
      if (!hasDescription) console.warn(MESSAGE);
    }
  }, [MESSAGE, contentRef, descriptionId]);
  return null;
};
var Root = Dialog$1;
var Portal = DialogPortal$1;
var Overlay = DialogOverlay$1;
var Content = DialogContent$1;
var Title = DialogTitle$1;
var Description = DialogDescription$1;
var Close = DialogClose;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
const MILESTONE_LABELS = {
  7: "Week 1 Warrior",
  14: "Halfway Hero",
  21: "3 Weeks Strong",
  30: "30-Day Legend"
};
function useAllDayPlans() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated } = useAuth();
  return useQuery({
    queryKey: ["allDayPlans"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getAllDayPlans();
      return result;
    },
    enabled: !!actor && !isFetching && isAuthenticated
  });
}
function SkeletonTile({ index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "shimmer rounded-2xl",
      style: {
        height: "clamp(88px, 12vw, 120px)",
        animationDelay: `${index * 0.04}s`
      }
    }
  );
}
function DevBadge() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.span,
    {
      initial: { opacity: 0, scale: 0.85 },
      animate: { opacity: 1, scale: 1 },
      className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-[10px] font-mono font-bold tracking-widest uppercase",
      "data-ocid": "plan.dev_badge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3 h-3" }),
        "DEV"
      ]
    }
  );
}
function DevModeDialog({
  open,
  onOpenChange
}) {
  const [code, setCode] = reactExports.useState("");
  const inputRef = reactExports.useRef(null);
  const { mutateAsync: setDevMode, isPending } = useSetDeveloperMode();
  reactExports.useEffect(() => {
    if (open) {
      setCode("");
      setTimeout(() => {
        var _a;
        return (_a = inputRef.current) == null ? void 0 : _a.focus();
      }, 100);
    }
  }, [open]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    try {
      await setDevMode(code.trim());
      ue.success("Developer mode enabled — all 30 days unlocked!", {
        duration: 4e3
      });
      onOpenChange(false);
    } catch (err) {
      ue.error(
        err instanceof Error ? err.message : "Invalid developer code",
        { duration: 4e3 }
      );
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-sm", "data-ocid": "dev_mode.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-primary" }),
        "Developer Access"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "font-body text-sm", children: "Enter the developer code to unlock all 30 days." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "mt-2 flex flex-col gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          ref: inputRef,
          type: "password",
          placeholder: "Developer code",
          value: code,
          onChange: (e) => setCode(e.target.value),
          disabled: isPending,
          "data-ocid": "dev_mode.input",
          autoComplete: "off"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 justify-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "ghost",
            onClick: () => onOpenChange(false),
            disabled: isPending,
            "data-ocid": "dev_mode.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: !code.trim() || isPending,
            "data-ocid": "dev_mode.submit_button",
            children: isPending ? "Verifying…" : "Unlock"
          }
        )
      ] })
    ] })
  ] }) });
}
function LockedTooltip({
  day,
  visible
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 4, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 4, scale: 0.95 },
      transition: { duration: 0.15 },
      className: "absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-foreground text-background text-[10px] font-semibold px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg", children: [
        "Complete Day ",
        day - 1,
        " to unlock",
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" })
      ] })
    }
  ) });
}
function DayTile({
  plan,
  tileState,
  isAccessible,
  isDev,
  isMilestone,
  onClick,
  index
}) {
  const day = Number(plan.day);
  const exerciseCount = plan.exercises.length;
  const milestoneLabel = MILESTONE_LABELS[day];
  const [showTooltip, setShowTooltip] = reactExports.useState(false);
  const handleClick = () => {
    if (!isAccessible) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2e3);
      return;
    }
    onClick();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "relative",
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.02, ease: "easeOut" },
      children: [
        isMilestone && tileState !== "locked" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-primary/10 to-transparent -z-10 blur-sm scale-110" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LockedTooltip, { day, visible: showTooltip }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleClick,
            "aria-label": isAccessible ? `Day ${day}: ${plan.focus}` : `Day ${day} locked — complete Day ${day - 1} first`,
            "aria-disabled": !isAccessible,
            "data-ocid": `plan.tile.${day}`,
            className: cn(
              "relative w-full flex flex-col items-center justify-center rounded-2xl p-3 text-center",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "select-none border transition-all duration-200",
              // Current day
              tileState === "current" && [
                "tile-active tile-hover",
                "bg-card text-foreground border-primary"
              ],
              // Completed day
              tileState === "completed" && [
                "tile-completed tile-hover",
                "bg-card text-foreground"
              ],
              // Locked
              tileState === "locked" && [
                "tile-locked",
                isAccessible && "!opacity-100 !grayscale-0 !cursor-pointer tile-hover"
              ]
            ),
            style: {
              minHeight: "clamp(88px, 12vw, 120px)",
              boxShadow: tileState === "current" ? "var(--shadow-glow-primary)" : tileState === "completed" ? "var(--shadow-card)" : void 0
            },
            children: [
              isDev && tileState === "locked" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-1.5 left-1.5 text-[7px] font-mono font-bold text-primary/60 leading-none z-10", children: "DEV" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-2 right-2 flex items-center justify-center w-5 h-5", children: [
                tileState === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CircleCheck,
                  {
                    className: "w-4 h-4 text-green-500",
                    strokeWidth: 2.5
                  }
                ),
                tileState === "current" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Play,
                  {
                    className: "w-3.5 h-3.5 text-primary fill-primary",
                    strokeWidth: 0
                  }
                ),
                tileState === "locked" && !isAccessible && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3 text-muted-foreground/50" }),
                tileState === "locked" && isAccessible && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Play,
                  {
                    className: "w-3.5 h-3.5 text-primary/70 fill-primary/70",
                    strokeWidth: 0
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "block font-display font-semibold uppercase tracking-[0.15em] leading-none mb-0.5 text-[9px]",
                    tileState === "current" && "text-primary",
                    tileState === "completed" && "text-green-500/80",
                    tileState === "locked" && "text-muted-foreground/50"
                  ),
                  children: "DAY"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "block font-display font-black leading-none",
                    "text-2xl sm:text-3xl",
                    tileState === "current" && "text-foreground",
                    tileState === "completed" && "text-foreground/80",
                    tileState === "locked" && "text-foreground/40"
                  ),
                  children: day
                }
              ),
              plan.focus && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "hidden sm:block mt-1 text-[9px] font-semibold leading-tight truncate w-full px-1",
                    tileState === "current" && "text-primary/80",
                    tileState === "completed" && "text-muted-foreground",
                    tileState === "locked" && "text-muted-foreground/40"
                  ),
                  children: plan.focus
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  className: cn(
                    "mt-1.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wide",
                    tileState === "current" && "bg-primary/15 text-primary",
                    tileState === "completed" && "bg-green-500/10 text-green-500/80",
                    tileState === "locked" && "bg-muted text-muted-foreground/40"
                  ),
                  children: [
                    exerciseCount,
                    " ex"
                  ]
                }
              ),
              tileState === "current" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[8px] font-bold uppercase tracking-widest shadow-md whitespace-nowrap", children: "Today" })
            ]
          }
        ),
        isMilestone && milestoneLabel && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-5 left-1/2 -translate-x-1/2 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "milestone-badge text-[7px] whitespace-nowrap px-1.5 py-0.5", children: milestoneLabel }) })
      ]
    }
  );
}
function ProgressHeader({
  firstName,
  completedCount,
  totalDays,
  isDeveloper,
  streakDays
}) {
  const pct = Math.round(completedCount / totalDays * 100);
  const milestoneMarkers = [
    { pct: 7 / 30 * 100, label: "W1" },
    { pct: 14 / 30 * 100, label: "½" },
    { pct: 21 / 30 * 100, label: "W3" },
    { pct: 100, label: "🏆" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "bg-card border-b border-border px-4 sm:px-6 py-5",
      "data-ocid": "plan.progress_header",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl sm:text-2xl text-foreground leading-tight", children: firstName ? `Hey ${firstName} 👋` : "Your 30-Day Plan" }),
              isDeveloper && /* @__PURE__ */ jsxRuntimeExports.jsx(DevBadge, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-0.5 font-body", children: completedCount === 0 ? "Start your journey — every rep counts!" : completedCount < 15 ? "Keep going — you're building momentum!" : completedCount < 28 ? "Incredible consistency — you're almost there!" : "You're a champion — finish strong!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 shrink-0 ml-4", children: [
            streakDays > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center hidden sm:block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-0.5 font-display font-bold text-xl text-accent leading-none streak-pulse", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4" }),
                streakDays
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5", children: "streak" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-3xl text-primary leading-none", children: completedCount }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display text-sm text-muted-foreground font-medium", children: [
                "/",
                totalDays
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5", children: "days done" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-3 bg-muted rounded-full overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { width: 0 },
              animate: { width: `${pct}%` },
              transition: { duration: 0.9, ease: "easeOut", delay: 0.25 },
              className: "absolute inset-y-0 left-0 rounded-full",
              style: {
                background: "linear-gradient(90deg, oklch(var(--primary)), oklch(var(--accent)))"
              }
            }
          ),
          milestoneMarkers.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-background transition-all duration-500",
                pct >= m.pct ? "bg-accent scale-125" : "bg-border scale-100"
              ),
              style: { left: `${m.pct}%` },
              "aria-hidden": "true"
            },
            m.pct
          ))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-2 text-[9px] font-bold uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "transition-colors",
                pct >= 7 / 30 * 100 ? "text-primary" : "text-muted-foreground/50"
              ),
              children: "Wk 1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "transition-colors",
                pct >= 14 / 30 * 100 ? "text-accent" : "text-muted-foreground/50"
              ),
              children: "Halfway"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "transition-colors",
                pct >= 21 / 30 * 100 ? "text-primary" : "text-muted-foreground/50"
              ),
              children: "Wk 3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "transition-colors flex items-center gap-0.5",
                pct >= 100 ? "text-accent" : "text-muted-foreground/50"
              ),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3" }),
                "Done"
              ]
            }
          )
        ] }),
        pct > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            transition: { delay: 1, duration: 0.3 },
            className: "mt-3",
            children: [
              completedCount >= 30 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-accent/10 border border-accent/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-4 h-4 text-accent shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-accent", children: "🎉 You completed the 30-Day Challenge!" })
              ] }),
              completedCount >= 21 && completedCount < 30 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/8 border border-primary/15", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "w-4 h-4 text-primary shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-semibold text-primary", children: [
                  "3 Weeks Strong! Only ",
                  30 - completedCount,
                  " days to go!"
                ] })
              ] })
            ]
          }
        )
      ] })
    }
  );
}
function GridLegend() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: 0.7 },
      className: "mt-10 flex flex-wrap items-center justify-center gap-5 text-[11px] text-muted-foreground font-body",
      "data-ocid": "plan.legend",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-lg border border-green-500/40 bg-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-2.5 h-2.5 text-green-500" }) }),
          "Completed"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "w-4 h-4 rounded-lg border border-primary bg-card",
              style: { boxShadow: "0 0 6px oklch(var(--primary)/0.4)" }
            }
          ),
          "Today"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 rounded-lg border border-border bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-2.5 h-2.5 text-muted-foreground/40" }) }),
          "Locked"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "milestone-badge text-[8px] px-1.5 py-0.5", children: "Milestone" }) })
      ]
    }
  );
}
function EmptyPlan() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "flex flex-col items-center justify-center py-24 text-center",
      "data-ocid": "plan.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground mb-2", children: "Plan not ready yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs font-body", children: "Your 30-day workout plan is being prepared. Check back shortly!" })
      ]
    }
  );
}
function PlanPage() {
  var _a;
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { data: profile } = useUserProfile();
  const { data: plans = [], isLoading: plansLoading } = useAllDayPlans();
  const { isLoading: progressLoading } = useMyProgress();
  const [devModalOpen, setDevModalOpen] = reactExports.useState(false);
  const {
    isDeveloper,
    completedDays,
    currentDay,
    isDayAccessible,
    isDayCompleted,
    isMilestone
  } = useDerivedProgress();
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, authLoading, navigate]);
  const firstName = ((_a = profile == null ? void 0 : profile.email) == null ? void 0 : _a.split("@")[0]) ?? "";
  const completedCount = completedDays.length;
  const totalDays = 30;
  const streakDays = (() => {
    if (completedDays.length === 0) return 0;
    const sorted = [...completedDays].sort((a, b) => b - a);
    let streak = 0;
    for (let i = 0; i < sorted.length; i++) {
      if (i === 0 || sorted[i - 1] - sorted[i] === 1) streak++;
      else break;
    }
    return streak;
  })();
  const isLoading = authLoading || plansLoading || progressLoading;
  function getTileState(day) {
    if (isDayCompleted(day)) return "completed";
    if (day === currentDay) return "current";
    return "locked";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Layout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DevModeDialog, { open: devModalOpen, onOpenChange: setDevModalOpen }),
    !isLoading && plans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProgressHeader,
      {
        firstName,
        completedCount,
        totalDays,
        isDeveloper,
        streakDays
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "flex-1 bg-background px-4 sm:px-6 py-6 sm:py-8",
        "data-ocid": "plan.page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-8 w-48 rounded-lg mb-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4", children: Array.from({ length: 30 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonTile, { index: i }, `skel-${i + 1}`)) })
        ] }) : plans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyPlan, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: -8 },
              animate: { opacity: 1, y: 0 },
              className: "flex items-center justify-between mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      className: "font-display font-bold text-lg text-foreground",
                      "data-ocid": "plan.grid_heading",
                      children: "30-Day Workout Plan"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 font-body", children: isDeveloper ? "Developer mode — all days unlocked" : `Day ${currentDay} is your next workout` })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  completedCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 text-xs font-bold", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                    completedCount,
                    " done"
                  ] }),
                  !isDeveloper && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDevModalOpen(true),
                      "aria-label": "Developer mode settings",
                      title: "Developer mode",
                      "data-ocid": "plan.dev_mode_open_modal_button",
                      className: "p-1.5 rounded-lg text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 pb-8",
              "data-ocid": "plan.grid",
              children: plans.map((plan, index) => {
                const day = Number(plan.day);
                const tileState = getTileState(day);
                const accessible = isDayAccessible(day);
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  DayTile,
                  {
                    plan,
                    tileState,
                    isAccessible: accessible,
                    isDev: isDeveloper,
                    isMilestone: isMilestone(day),
                    index,
                    onClick: () => navigate({
                      to: "/plan/$day",
                      params: { day: String(day) }
                    })
                  },
                  day
                );
              })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(GridLegend, {})
        ] }) })
      }
    )
  ] });
}
export {
  PlanPage as default
};
