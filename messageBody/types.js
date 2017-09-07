/* eslint-disable no-undef */
/**
 * @flow
 */

export type InlineStyle =
  | "Italic"
  | "Bold"
  | "Struck"
  | "Small"
  | "Code"
  | "Subscript"
  | "Superscript"
  | "Underline"
  | "Normal";

export type TextNode = {
  type: "Text",
  value: string,
  styles: Array<InlineStyle>
};

export type LineBreakNode = { type: "LineBreak" };

export type LinkNode = {
  type: "Link",
  value: Array<TextNode>,
  href: string,
  target?: ?string
};

export type InlineNode = TextNode | LineBreakNode | LinkNode;

export type ParagraphNode = {
  type: "Paragraph",
  value: Array<InlineNode>
};

export type ImageAttributes = {
  src: string,
  alt: string,
  width: number,
  height: number
};

export type ImageNode = {
  type: "Image"
} & ImageAttributes;

export type BlockNode = ParagraphNode;
