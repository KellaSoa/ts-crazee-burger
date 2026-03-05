import styled from "styled-components";
import { theme } from "@/theme/theme";
import { fadeIn } from "@/theme/animations";
import { Category } from "@/types/Category";
import { Chip } from "@/components/reusable-ui/Chip";

// const DEFAULT_COLOR = "#FFF"

type CategoryPreviewProps = Category & { className?: string };

export default function CategoryPreview({
  label,
  color,
  iconName,
  className,
}: CategoryPreviewProps) {
  // let defaultBorderColor = DEFAULT_COLOR
  // let defaultBackgroundColor = DEFAULT_COLOR

  // if (color && isHexColor(color)) defaultBorderColor = applyOpacity(color as string, 0.3) ?? "red"
  // if (color && isHexColor(color))
  //   defaultBackgroundColor = applyOpacity(color as string, 0.1) ?? "red"

  return (
    <ImagePreviewStyled className={className}>
      {label !== "" || iconName ? (
        <div className="preview-container-with-label">
          <Chip
            id={label}
            label={label}
            color={color}
            className="chip"
            iconName={iconName}
          />
        </div>
      ) : (
        <div className="empty-image">
          <span>Aucune preview</span>
        </div>
      )}
    </ImagePreviewStyled>
  );
}

const ImagePreviewStyled = styled.div`
  grid-area: 1 / 1 / 4 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-x: scroll;

  .chip {
    /* transition: ease-in 5000ms; */
    /* transform: scale(1.3); */
  }

  .preview-container {
    overflow-x: scroll;
  }

  .preview-container-with-label {
    padding-right: 20px;
    padding-left: 20px;
    border-radius: ${theme.borderRadius.round};
    height: 100%;
    width: 100%;
    /* border: 1px solid ${theme.colors.greyLight}; */
    overflow-x: scroll; //normalement ce overflow là est inutile c'est celui du bas qui est vraiment utile mais à vérifier
    &::-webkit-scrollbar {
      display: none;
    }

    /* Pour Firefox */
    scrollbar-width: none; /* Cache la scrollbar sans la désactiver */
    -ms-overflow-style: none; /* Pour IE et Edge */

    display: flex;
    justify-content: center;
    align-items: center;

    .label {
      animation: ${fadeIn} 1s;
      /* margin-right: 0px; */
      /* margin-left: 0px; */
      overflow-x: scroll;

      &::-webkit-scrollbar {
        display: none;
      }

      /* Pour Firefox */
      scrollbar-width: none; /* Cache la scrollbar sans la désactiver */
      -ms-overflow-style: none; /* Pour IE et Edge */
    }
  }

  .empty-image {
    /* background-color: green; */
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    /* border: 1px solid ${theme.colors.greyLight}; */
    line-height: 1.5;
    color: ${theme.colors.greySemiDark};
    border-radius: ${theme.borderRadius.round};
    span {
    }
  }
`;
