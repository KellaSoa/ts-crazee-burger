import { theme } from "@/theme/theme";

import styled from "styled-components";
import { getCategoryIcon } from "@/utils/icon";
import { applyOpacity } from "@/utils/color";
import { IS_SELECTED_COLOR } from "@/enums/categories";
import { Category } from "@/types/Category";
import { ComponentPropsWithRef } from "react";

type ChipProps = Category &
  ComponentPropsWithRef<"div"> & {
    backgroundColor?: string;
  };

export const Chip = ({
  label,
  iconName,
  color,
  className,
  isActive,
  backgroundColor,
  ...restProps
}: ChipProps) => {
  const defaultBorderColor = color
    ? applyOpacity(color as string, 0.3)
    : "transparent";
  const defaultBackgroundColor = color
    ? applyOpacity(color as string, 0.1)
    : "transparent";

  const IconToDisplay = getCategoryIcon(iconName);

  const getActiveColor = () =>
    backgroundColor ? backgroundColor : IS_SELECTED_COLOR.backgroundColor;

  const colorApplied = isActive ? IS_SELECTED_COLOR.color : color;
  const backgroundColorApplied = isActive
    ? getActiveColor()
    : defaultBackgroundColor;
  const borderColorApplied = isActive ? getActiveColor() : defaultBorderColor;

  return (
    <ChipStyled
      color={colorApplied}
      backgroundColor={backgroundColorApplied}
      borderColor={borderColorApplied}
      className={className}
      {...restProps}
    >
      {IconToDisplay && (
        <div className="icon">
          <IconToDisplay color={color} />
        </div>
      )}
      {label && <span className="label">{label}</span>}
    </ChipStyled>
  );
};

type ChipStyledProps = {
  color: string;
  backgroundColor: string;
  borderColor: string;
};

const ChipStyled = styled.div<ChipStyledProps>`
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 16px;
  border-radius: ${theme.borderRadius.badgeRound};
  background-color: ${({ backgroundColor }) => backgroundColor};
  column-gap: 10px;

  .label {
    color: ${({ color }) => color};
    white-space: nowrap;
  }

  .icon {
    display: flex; // aligne verticalement l'icone
    /* margin-right: 10px; */ // mauvais car si y'a pas de label, l'icone montre un margin right chelou.
  }

  .delete-chip {
    margin-left: 5px;
    color: ${({ color }) => color};
  }
`;
