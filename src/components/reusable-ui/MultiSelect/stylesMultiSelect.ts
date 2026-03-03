//@ts-nocheck
import { theme } from "@/theme/theme";
import { Category } from "@/types/Category";
import { applyOpacity, getBgColorToApply } from "@/utils/color";

export const stylesMultiSelect = {
  // 💡 control => c'est le style de tout le container de Select.
  // control = le bloc principal du composant select (là où tu cliques pour ouvrir la liste, là où s’affichent les valeurs sélectionnées, etc.)
  control: (base) => ({
    ...base,
    // borderColor: "red", // 👈 la bordure en rouge
    // gridArea: "1 / 2 / -1 / -1",
    // boxShadow: state.isFocused ? "0 0 0 1px red" : "none", // 👈 pour le focus
    background: theme.colors.background_white,
    border: "none",
    borderRadius: theme.borderRadius.round,
    boxShadow: "none", // ✅ enlève le halo bleu au focus
    paddingLeft: 15,
    paddingRight: 15,
    "&:hover": {
      // borderColor: "darkred", // 👈 si tu veux un hover plus marqué
      // pointerEvents: "visible"
    },
  }),
  // 💡 "multiValue": permet de personnaliser l’apparence des “badges” (ou “chips”) qui s’affichent dans le champ quand tu sélectionnes plusieurs valeurs.
  multiValue: (base, state) => {
    const data = state.data as Category;
    return {
      ...base,
      backgroundColor: data.color
        ? applyOpacity(data.color, 0.1)
        : applyOpacity(theme.colors.purple, 0.3), // ✅ on récupère la couleur définie dans l'option
      borderRadius: 20,
      border: `1px solid ${data.color}`, // 👈 ici le borderColor du badge
      padding: "0px 6px", // paddingVertical à 0px sinon, c'est trop gros et ça fait grandir verticalement le Select container. Teste, et change ça valeur à 30px, tu verras la différence en rajoutant une valeur.
      flexShrink: 0, // <-- empêche le squish
    };
  },
  multiValueLabel: (base) => ({
    ...base,
    color: "white", // ou autre couleur contrastée
    fontWeight: 500,
  }),
  multiValueRemove: (base, state) => ({
    ...base,
    position: "relative",
    // top: 5.5,
    // color: state.data.color,
    color: "white",
    backgroundColor: state.data.color ? state.data.color : theme.colors.dark,
    borderRadius: "50%",
    width: 14,
    height: 14,
    display: "flex",
    justifyContent: "center",
    alignSelf: "center",
    padding: 0,
    cursor: "pointer",
    marginLeft: 2,
    marginRight: 2,
    // border: "1px solid red",
    ":hover": {
      backgroundColor: "transparent",
      color: state.data.color ?? theme.colors.dark,
      border: "1.5px solid red",
      borderColor: state.data.color ?? theme.colors.dark,
    },
  }),
  option: (base, state) => {
    return {
      ...base,
      // backgroundColor: state.isSelected
      //   ? applyOpacity(state.data.color, 0.2)
      //   : state.isFocused
      //   ? applyOpacity(state.data.color, 0.1)
      //   : "white",
      backgroundColor: getBgColorToApply(
        state.data,
        state.isSelected,
        state.isFocused,
      ),
      color: state.data.color ?? theme.colors.greyBlue,
      display: "flex",
      alignItems: "center",
      gap: 8,
    };
  },
  valueContainer: (base) => ({
    ...base,
    background: theme.colors.background_white,
    display: "flex",
    flexWrap: "nowrap", // on veut une seule ligne
    // overflowX: "auto", // scroll si ça dépasse
    maxWidth: "100%",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
    "&::-webkit-scrollbar": {
      height: 4, // petit scroll horizontal
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#ccc", // couleur du scroll
      borderRadius: 4,
    },
    borderRadius: theme.borderRadius.round,
  }),
  indicatorsContainer: (base) => ({
    ...base,
    // border: "1px solid red",
    // width: 80, // largeur fixe pour éviter que ça bouge
    position: "relative", // nécessaire pour le positionnement absolu interne
    justifyContent: "flex-end", // si t’enlèves le clear, ça reste aligné à droite
  }),
  clearIndicator: (base) => ({
    ...base,
    // position: "absolute",
    // left: 8, // positionne la croix à gauche du chevron
    // top: "50%",
    // transform: "translateY(-50%)",
    // // padding: 0,
    // right: 20,
    marginRight: -7,
    // color: "red"
  }),
  indicatorSeparator: () => ({
    display: "none", // ou bien applique aussi un fond si tu veux le garder
  }),
  dropdownIndicator: (base) => ({
    ...base,
    // backgroundColor: "#f6f6f6", // même que control
    backgroundColor: "transparent", // 👈 parfois c’est cette div qui fout le fond blanc
    // padding: "0 8px",
    height: "100%",
    // display: "flex",
    alignItems: "center",
    color: "#17161a", // 👈 ça suffit souvent
    marginRight: 5,
    position: "absolute",
    right: 8, // distance fixe depuis le bord droit
    top: "50%",
    transform: "translateY(-50%)",
    padding: 0,
    display: "none",
    "& svg": {
      fill: "#17161a", // 👈 parfois c'est ça qui marche mieux
      width: 18,
      height: 18,
      marginRight: 3,
    },
  }),
  menu: (base) => ({
    ...base,
    width: "100%", // pour ajuster le width du menu déroulant. Par défaut il est à 100%.
    minWidth: 0,
  }),
};
