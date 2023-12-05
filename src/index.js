import "./index.css";
import avatarImage from "./images/avatar.jpg";
import cardOneImage from "./images/card_1.jpg";
import cardTwoImage from "./images/card_2.jpg";
import cardThreeImage from "./images/card_3.jpg";
import { initialCards } from "./scripts/data/cards";
import "./scripts/modal";
import { renderCard } from "./scripts/card";

initialCards.forEach(renderCard);
