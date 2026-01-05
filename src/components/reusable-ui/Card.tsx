import styled, { css } from "styled-components";
import { theme } from "@/theme/theme";
import Button from "./Button";
import { TiDelete } from "react-icons/ti";
import { fadeInFromRight, fadeInFromTop } from "@/theme/animations";
import { Chips } from "../pages/order/Main/MainLeftSide/Menu/Chips";
import { Category } from "@/types/Category";

type CardProps = {
  title?: string;
  imageSource?: string;
  leftDescription: string;
  hasDeleteButton?: boolean;
  onDelete?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  isHoverable?: boolean;
  isSelected?: boolean;
  isMenu?: boolean;
  onAdd?: React.MouseEventHandler<HTMLButtonElement>;
  overlapImageSource: string;
  isOverlapImageVisible?: boolean;
  categories?: Category[];
  oldPrice?: string;
};

export default function Card({
  title,
  imageSource,
  leftDescription,
  hasDeleteButton,
  onDelete,
  onClick,
  isHoverable,
  isSelected,
  isMenu,
  onAdd,
  overlapImageSource,
  isOverlapImageVisible,
  categories,
  oldPrice,
}: CardProps) {
  // state (vide)

  // affichage
  return (
    <CardStyled
      className="produit"
      onClick={onClick}
      isHoverable={isHoverable}
      isSelected={isSelected}
      isMenu={isMenu}
      areChipsVisible={hasDeleteButton}
    >
      <div className="card">
        {hasDeleteButton && (
          <button
            className="delete-button"
            aria-label="delete-button"
            onClick={onDelete}
          >
            <TiDelete className="icon" />
          </button>
        )}

        <div className="image">
          {isOverlapImageVisible && (
            <div className="overlap">
              <div className="transparent-layer"></div>
              <img
                className="overlap-image"
                src={overlapImageSource}
                alt="overlap"
              />
            </div>
          )}
          <img className="product" src={imageSource} alt={title} />
        </div>

        <div className="text-info">
          <div className="title">{title}</div>
          <div className="description">
            <div className="left-description">
              <span className="new-price">{leftDescription}</span>
              {oldPrice && <span className="old-price">{oldPrice}</span>}
            </div>
            <div className="right-description">
              <Button
                className="primary-button"
                label={"Ajouter"}
                onClick={onAdd}
                disabled={isOverlapImageVisible}
              />
            </div>
          </div>
        </div>
      </div>
      {hasDeleteButton && <Chips categories={categories} />}
    </CardStyled>
  );
}

type CardStyledProps = {
  isHoverable?: boolean;
  isSelected?: boolean;
  isMenu?: boolean;
  areChipsVisible?: boolean;
};

const CardStyled = styled.div<CardStyledProps>`
  ${({ isHoverable }) => isHoverable && hoverableStyle}
  border-radius: ${theme.borderRadius.extraRound};
  /* border: 1px solid red; */
  height: ${({ areChipsVisible }) => (areChipsVisible ? "360px" : "330px")};
  box-shadow: -8px 8px 20px 0px rgb(0 0 0 / 20%);
  /* position: relative; */
  display: flex;
  flex-direction: column;
  width: 240px;

  .card {
    background: ${theme.colors.white};
    box-sizing: border-box;
    width: 240px;
    height: 330px;
    display: grid;
    grid-template-rows: 65% 1fr;
    padding: 20px;
    padding-bottom: 10px;
    border-radius: ${theme.borderRadius.extraRound};
    position: relative; // pour le delete-button qui est en positon 'absolute'
    /* border: 1px solid blue; */

    // code pour rajouter les chips
    border-bottom: none;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    border-radius: ${({ areChipsVisible }) =>
      areChipsVisible === false && theme.borderRadius.extraRound};

    .delete-button {
      border: 1px solid red;
      position: absolute;
      top: 15px;
      right: 15px;
      cursor: pointer;
      width: 30px;
      height: 30px;
      color: ${theme.colors.primary};
      z-index: 2;
      padding: 0;
      border: none;
      background: none;
      animation: ${fadeInFromRight} ${theme.animations.speed.slow} ease-out;

      .icon {
        /* border: 1px solid blue; */
        height: 100%;
        width: 100%;
      }

      :hover {
        color: ${theme.colors.red};
        /* background-color: red; */
      }
      :active {
        color: ${theme.colors.primary};
      }
    }

    .image {
      /* border: 2px solid green; */
      margin-top: 30px;
      margin-bottom: 20px;
      /* position: relative; */
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        aspect-ratio: 1; // pour que l'image ne change pas de taille même si ".image" change de height à cause de la carte qui grandit de 30xp avec les chips en mode admin
      }

      .overlap {
        .overlap-image {
          /* border: 1px solid red; */
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80%;
          height: 100%;
          z-index: 1;
          animation: ${fadeInFromTop} 500ms;
          border-radius: ${theme.borderRadius.extraRound};
        }

        .transparent-layer {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 70%;
          background: snow;
          z-index: 1;
          border-radius: ${theme.borderRadius.extraRound};
        }
      }
    }

    .text-info {
      display: grid;
      grid-template-rows: 30% 70%;
      padding: 5px;

      .title {
        margin: auto 0;
        font-size: ${theme.fonts.size.P4};
        position: relative;
        bottom: 10px;
        font-weight: ${theme.fonts.weights.bold};
        color: ${theme.colors.dark};
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        font-family: "Amatic SC", cursive;
      }

      .description {
        display: grid;
        grid-template-columns: 1fr 1fr;

        .left-description {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-weight: ${theme.fonts.weights.medium};
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: ${theme.fonts.weights.medium};
          color: ${theme.colors.primary};
          position: relative;

          .new-price {
          }

          .old-price {
            position: absolute;
            bottom: 5px;
            left: 0;
            text-decoration: line-through;
            color: ${({ isSelected }) =>
              isSelected ? theme.colors.white : theme.colors.redSecondary};
            font-size: ${theme.fonts.size.XS};
            font-weight: ${theme.fonts.weights.semiBold};
          }
        }

        .right-description {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: ${theme.fonts.size.P1};

          .primary-button {
            font-size: ${theme.fonts.size.XS};
            padding: 12px;
          }
        }
      }
    }

    ${({ isHoverable, isSelected, isMenu }) =>
      isHoverable && isSelected && selectedStyle(isMenu)}
  }
`;

const hoverableStyle = css`
  :hover {
    /* box-shadow: ${theme.shadows.orangeHighlight}; */
    cursor: pointer;
  }
`;

const selectedStyle = (isMenu?: boolean) => css`
  background: ${isMenu ? theme.colors.purple : theme.colors.primary};

  .primary-button {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.white};
    transition: all 200ms ease-out;
    :hover {
      color: ${theme.colors.white};
      background-color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.white};
      transition: all 200ms ease-out;
    }
    :active {
      background-color: ${theme.colors.white};
      color: ${theme.colors.primary};
    }

    &.is-disabled {
      opacity: 50%;
      cursor: not-allowed;
      z-index: 2;
    }

    &.with-focus {
      border: 1px solid white;
      background-color: ${theme.colors.white};
      color: ${theme.colors.primary};
      :hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.white};
      }
      :active {
        background-color: ${theme.colors.white};
        color: ${theme.colors.primary};
      }
    }
  }

  .delete-button {
    color: ${theme.colors.white};

    :active {
      color: ${theme.colors.white};
    }
  }

  .text-info {
    .description {
      .left-description {
        color: ${theme.colors.white};
      }
    }
  }
`;
