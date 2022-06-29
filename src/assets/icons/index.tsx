
import { ComponentProps, splitProps } from "solid-js"
type IconProps<P = {}> = P & {
    size?: number
    basic?: boolean
}
import HeroiconsSolidArrowCircleRight from "~icons/heroicons-solid/arrow-circle-right";
import HeroiconsOutlineArrowCircleRight from "~icons/heroicons-outline/arrow-circle-right";

export const AcademicCapIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <HeroiconsOutlineArrowCircleRight
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <HeroiconsSolidArrowCircleRight
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import FluentAddSquareMultiple16Filled from "~icons/fluent/add-square-multiple-16-filled";
import FluentAddSquareMultiple16Regular from "~icons/fluent/add-square-multiple-16-regular";

export const AddIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <FluentAddSquareMultiple16Regular
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <FluentAddSquareMultiple16Filled
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import HeroiconsSolidTrash from "~icons/heroicons-solid/trash";
import HeroiconsOutlineTrash from "~icons/heroicons-outline/trash";

export const TrashIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <HeroiconsOutlineTrash
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <HeroiconsSolidTrash
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import FluentCheckboxChecked24Filled from "~icons/fluent/checkbox-checked-24-filled";
import FluentCheckboxChecked24Regular from "~icons/fluent/checkbox-checked-24-regular";

export const FluentCheckBoxIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <FluentCheckboxChecked24Regular
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <FluentCheckboxChecked24Filled
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import HeroiconsSolidBadgeCheck from "~icons/heroicons-solid/badge-check";
import HeroiconsOutlineBadgeCheck from "~icons/heroicons-outline/badge-check";

export const CheckBoxBadgeIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <HeroiconsOutlineBadgeCheck
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <HeroiconsSolidBadgeCheck
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import FluentCheckboxUnchecked24Filled from "~icons/fluent/checkbox-unchecked-24-filled";
import FluentCheckboxUnchecked24Regular from "~icons/fluent/checkbox-unchecked-24-regular";

export const FluentUnCheckedBoxIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <FluentCheckboxUnchecked24Regular
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <FluentCheckboxUnchecked24Filled
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import HeroiconsSolidCheckCircle from "~icons/heroicons-solid/check-circle";
import HeroiconsOutlineCheckCircle from "~icons/heroicons-outline/check-circle";

export const CheckBoxCircleIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <HeroiconsOutlineCheckCircle
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <HeroiconsSolidCheckCircle
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import FluentShare48Filled from "~icons/fluent/share-48-filled";
import FluentShare48Regular from "~icons/fluent/share-48-regular";

export const ShareIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
    <span class="relative">
        <FluentShare48Regular
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 group-focus-visible:opacity-0 group-hover:opacity-0 group-focus-visible:duration-300 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100 group-hover:duration-300"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
            <FluentShare48Filled
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                        : local.class
                    : local?.basic
                    ? "w-5 h-5 absolute opacity-0 group-focus-visible:opacity-100 group-hover:opacity-100 -translate-y-full scale-100 group-active:scale-90 group-focus-visible:scale-95 group-hover:scale-95 transition-[opacity,transform] duration-100"
                    : "w-5 h-5"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    </span>
    )
}
import EosIconsLoading from "~icons/eos-icons/loading";
export const LoadingIcon = (props: IconProps<ComponentProps<"svg">>) => {
    const [local, others] = splitProps(props, [
        "size",
        "class",
        "shape-rendering",
        "basic",
    ])
    if (typeof local.basic === "undefined") {
        local.basic = true
    }
    return (
        <EosIconsLoading
            shape-rendering="geometricPrecision"
            class={
                local?.class
                    ? local?.basic
                        ? local.class +
                          " group-active:scale-100 group-hover:scale-105 transition-transform"
                        : local.class
                    : local.basic
                    ? "w-6 h-6 group-active:scale-100 group-hover:scale-105 transition-transform"
                    : "w-6 h-6"
            }
            width={`${local.size || 24}px`}
            height={`${local.size || 24}px`}
            {...others}
        />
    )
}