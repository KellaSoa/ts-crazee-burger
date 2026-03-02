import { Chip } from "@/components/reusable-ui/Chip";
import { badgeAnimation, chipAnimation } from "@/theme/animations";
import { theme } from "@/theme/theme";
import { Category } from "@/types/Category";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

type ChipsProps = {
  categories?: Category[];
};

export const Chips = ({ categories }: ChipsProps) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const elementScrollable = useRef<HTMLDivElement>(null);
  const scrollToRight = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (elementScrollable.current) {
      event.stopPropagation();
      elementScrollable.current.scrollBy({ left: 110, behavior: "smooth" }); // 110px à droite
    }
  };

  const scrollToStart = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (elementScrollable.current) {
      event.stopPropagation();
      elementScrollable.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const checkScrollable = () => {
      if (elementScrollable.current) {
        const { scrollWidth, clientWidth, scrollLeft } =
          elementScrollable.current;
        setIsScrollable(scrollWidth > clientWidth);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1); // On vérifie si on est tout à droite
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    if (elementScrollable.current) {
      elementScrollable.current.addEventListener("scroll", checkScrollable);
    }

    return () => {
      window.removeEventListener("resize", checkScrollable);
      if (elementScrollable.current) {
        elementScrollable.current.removeEventListener(
          "scroll",
          checkScrollable
        );
      }
    };
  }, []);

  return (
    <ChipsStyled>
      <div className="circle-left" />
      <div className="circle-right">
        <div className="circle-right-small" />
      </div>
      <div className="dotted-line" />
      <div className="chips" ref={elementScrollable}>
        {categories?.map((category) => (
          <Chip key={category.id} {...category} className="chip" />
        ))}
        {/* {isAtEnd === true && isScrollable && <button onClick={scrollToRight} className="button-scroll">{"->"}</button>} */}
        {/* {isScrollable && <button onClick={scrollToRight} className="button-scroll">{"->"}</button>} */}
        {isScrollable && !isAtEnd && (
          <button className="button-scroll-to-right" onClick={scrollToRight}>
            ➡️
          </button>
        )}
        {isScrollable && isAtEnd && (
          <button className="button-scroll-to-start" onClick={scrollToStart}>
            ⬅️
          </button>
        )}
      </div>
    </ChipsStyled>
  );
};

const ChipsStyled = styled.div`
  /* position: absolute; */
  min-height: 27.5px; // si le produit n'a aucune catégorie, tous les chips container feront la même taille.
  /* background: ${theme.colors.white}; */
  /* right: 0; */
  /* left: 0; */
  /* flex: 1; */
  border-bottom-left-radius: ${theme.borderRadius.extraRound};
  border-bottom-right-radius: ${theme.borderRadius.extraRound};
  /* border-top: 1px dashed ${theme.colors.greyMedium}; */
  border: none;
  box-shadow: -8px 18px 20px 0px rgb(0 0 0 / 20%);
  /* mask: radial-gradient(circle at top left, #0000 20px, #000 20px); */
  position: relative;
  /* border: 1px solid blue; */

  /* animation: ${chipAnimation} ease-out ${theme.animations.speed.slow}; */
  animation: ${chipAnimation} 500ms;

  .dotted-line {
    border-top: 3px dashed ${theme.colors.greyLight};
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    margin-left: 12px;
    margin-right: 12px;
  }

  .circle-left {
    height: 25px;
    width: 25px;
    position: absolute;
    top: -11px;
    left: -13px;
    background-color: ${theme.colors.white};
    border-radius: 50%;
    background-color: ${theme.colors.white};
    box-shadow: -8px 18px 10px 0px rgb(0 0 0 / 20%) inset;
    clip-path: inset(0 0 50% 0);
    transform: rotate(90deg);
  }

  .circle-right {
    height: 25px;
    width: 25px;
    position: absolute;
    top: -11px;
    right: -13px;
    /* padding-right: 1px; */
    /* background-color: ${theme.colors.white}; */
    border-radius: 50%;
    /* background-color: #c6c6c8; */
    background-color: ${theme.colors.background_white};
    /* box-shadow: -8px 18px 10px 0px rgb(0 0 0 / 20%) inset; */
    clip-path: inset(0 0 50% 0);
    transform: rotate(-90deg);
    /* background: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.2) 0%,
        rgba(0, 0, 0, 0.1) 33%,
        rgba(0, 0, 0, 0.05) 66%,
        #c6c6c8 100%
      ); */
    display: flex;
    justify-content: center;
    align-items: center;

    .circle-right-small {
      height: 25px;
      width: 25px;
      top: -10px;
      right: -13px;
      /* background-color: ${theme.colors.white}; */
      border-radius: 50%;
      /* background-color: #c6c6c8; */
      /* background-color: red; */
      background-color: ${theme.colors.greyLight};
      /* filter: blur(10px); */
      /* backdrop-filter: blur(10px); */
      /* box-shadow: -8px 18px 10px 0px rgb(0 0 0 / 20%) inset; */
      clip-path: inset(0 0 50% 0);
      background: linear-gradient(
        to bottom,
        #f5f5f7 100% rgb(245, 245, 247) 0%
      );
      /* box-shadow: -8px 8px 20px 0px rgb(0 0 0 / 20%); */
    }
  }

  .chips {
    box-shadow: -8px 18px 20px 0px rgb(0 0 0 / 20%);
    display: flex;
    overflow-x: scroll;
    /* Cacher la scrollbar pour WebKit (Chrome, Safari, Edge) */
    &::-webkit-scrollbar {
      display: none;
    }

    /* Pour Firefox */
    scrollbar-width: none; /* Cache la scrollbar sans la désactiver */
    -ms-overflow-style: none; /* Pour IE et Edge */
    /* border: 1px solid red; */
    height: 100%;
    padding: 15px 0px 15px 20px;
    padding-right: 40px;
    background-color: white;
    border-bottom-left-radius: ${theme.borderRadius.extraRound};
    border-bottom-right-radius: ${theme.borderRadius.extraRound};

    .chip {
      margin-right: 10px;
      animation: ${badgeAnimation} 1000ms;
    }

    .button-scroll-to-right {
      position: absolute;
      right: 12px;
      opacity: 50%;
      cursor: pointer;
      /* top: 20px; */

      &:hover {
        opacity: 100%;
      }
    }

    .button-scroll-to-start {
      position: absolute;
      right: 12px;
      /* opacity: 20%; */
      cursor: pointer;
      background-color: #000;
      /* top: 20px; */

      &:hover {
        opacity: 100%;
      }
    }
  }
`;
