"use client";
import { ContentItem } from "@/lib/types";
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from "@/components/global/editor/components/Heading";
import { cn } from "@/lib/utils";
import DropZone from "./DropZone/DropZone";
import Paragraph from "@/components/global/editor/components/Paragraph";
import TableComponent from "@/components/global/editor/components/TableComponent";
import ColumnComponent from "@/components/global/editor/components/ColumnComponent/ColumnComponent";
import CustomImage from "@/components/global/editor/components/ImageComponent";
import Blockquote from "@/components/global/editor/components/Blockquote";
import NumberedList from "@/components/global/editor/components/NumberedList";
import BulletList from "@/components/global/editor/components/BulletList";
import TodoList from "@/components/global/editor/components/TodoList";
import CallOutBox from "@/components/global/editor/components/CallOutBox";
import CodeBlock from "@/components/global/editor/components/CodeBlock";
import TableOfContents from "@/components/global/editor/components/TableOfContents";
import Divider from "@/components/global/editor/components/Divider";

type Props = {
  content: ContentItem;
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
};

const ContentRenderer: React.FC<Props> = React.memo(
  ({ content, onContentChange, slideId, isPreview, isEditable }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: content.placeholder,
      value: content.content as string,
      onChange: handleChange,
      isPreview: isPreview,
    };

    const animationProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    };

    //WIP : create types
    switch (content.type) {
      case "heading1":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading1 {...commonProps} />
          </motion.div>
        );
      case "heading2":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading2 {...commonProps} />
          </motion.div>
        );
      case "heading3":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading3 {...commonProps} />
          </motion.div>
        );
      case "heading4":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Heading4 {...commonProps} />
          </motion.div>
        );
      case "title":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Title {...commonProps} />
          </motion.div>
        );
      case "paragraph":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <Paragraph {...commonProps} />
          </motion.div>
        );

      case "table":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <TableComponent
              content={(content.content as string[][]) || []}
              onChange={(newContent) =>
                onContentChange(
                  content.id,
                  newContent !== null ? newContent : ""
                )
              }
              initialColumnSize={content.initialRows}
              initialRowSize={content.initialColumns}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "resizable-column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div className="w-full h-full" {...animationProps}>
              <ColumnComponent
                content={content.content as ContentItem[]}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
                className={content.className}
              />
            </motion.div>
          );
        }
        return null;
      case "image":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <CustomImage
              src={content.content as string}
              alt={content.alt || "image"}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
            />
          </motion.div>
        );
      case "blockquote":
        return (
          <motion.div
            className={cn("w-full h-full flex flex-col", content.className)}
            {...animationProps}
          >
            <Blockquote>
              <Paragraph {...commonProps} />
            </Blockquote>
          </motion.div>
        );
      case "numberedList":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <NumberedList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "bulletList":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <BulletList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "todoList":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <TodoList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        );
      case "callOutBox":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <CallOutBox
              type={content.callOutType || "info"}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CallOutBox>
          </motion.div>
        );
      case "codeBlock":
        return (
          <motion.div className="w-full h-full" {...animationProps}>
            <CodeBlock
              code={content.code}
              language={content.language}
              onChange={() => {}}
              className={content.className}
            />
          </motion.div>
        );
        case "tableOfContents":
          return (
            <motion.div className="w-full h-full" {...animationProps}>
              <TableOfContents
                items={content.content as string[]}
                onItemClick={(id) => {
                  console.log(`Navigate tto section: ${id}` )
                }}
                className={content.className}
              />
            </motion.div>
          );
          case "divider":
            return (
              <motion.div className="w-full h-full" {...animationProps}>
                <Divider
                  className={content.className as string}
                />
              </motion.div>
            );
      case "column":
        if (Array.isArray(content.content)) {
          return (
            <motion.div
              className={cn("w-full h-full flex flex-col", content.className)}
              {...animationProps}
            >
              {content.content.length > 0 ? (
                (content.content as ContentItem[]).map(
                  (subItem: ContentItem, subIndex: number) => (
                    <React.Fragment key={subItem.id || `item-${subIndex}`}>
                      {!isPreview &&
                        !subItem.restrictToDrop &&
                        subIndex === 0 &&
                        isEditable && (
                          <DropZone
                            index={0}
                            parentId={content.id}
                            slideId={slideId}
                          />
                        )}
                      <MasterRecursiveComponent
                        content={subItem}
                        onContentChange={onContentChange}
                        slideId={slideId}
                        index={subIndex}
                        isPreview={isPreview}
                        isEditable={isEditable}
                      />
                      {!isPreview && !subItem.restrictToDrop && isEditable && (
                        <DropZone
                          index={subIndex + 1}
                          parentId={content.id}
                          slideId={slideId}
                        />
                      )}
                    </React.Fragment>
                  )
                )
              ) : isEditable ? (
                <DropZone index={0} parentId={content.id} slideId={slideId} />
              ) : null}
            </motion.div>
          );
        }
        return null;
      default:
        return null;
    }
  }
);

ContentRenderer.displayName = "ContentRenderer";

export const MasterRecursiveComponent: React.FC<Props> = React.memo(
  ({
    content,
    onContentChange,
    slideId,
    index,
    isPreview = false,
    isEditable = true,
  }) => {
    if (isPreview) {
      return (
        <ContentRenderer
          content={content}
          onContentChange={onContentChange}
          slideId={slideId}
          index={index}
          isPreview={isPreview}
          isEditable={isEditable}
        />
      );
    }
    return (
      <React.Fragment>
        <ContentRenderer
          content={content}
          onContentChange={onContentChange}
          slideId={slideId}
          index={index}
          isPreview={isPreview}
          isEditable={isEditable}
        />
      </React.Fragment>
    );
  }
);

MasterRecursiveComponent.displayName = "MasterRecursiveComponent";

// 3:22:22
