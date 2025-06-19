declare module "react-barcode" {
  import type { ComponentType } from "react";

  export interface BarcodeProps {
    value: string;
    format?: string;
    width?: number;
    height?: number;
    displayValue?: boolean;
    background?: string;
    lineColor?: string;
    margin?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    fontOptions?: string;
    font?: string;
    textAlign?: "left" | "center" | "right";
    textPosition?: "top" | "bottom";
    textMargin?: number;
    fontSize?: number;
  }

  const Barcode: ComponentType<BarcodeProps>;
  export default Barcode;
} 