import { Button, Paper, styled } from "@mui/material";
import React from "react";

type FooterButtonProps = {
  label: string;
  onClick?: () => void;
};

type Props = {
  lhs?: FooterButtonProps[];
  rhs?: FooterButtonProps[];
};

const WhiteTextButton = styled(Button)(() => ({ color: "#FFF" }));

const FooterButton = ({ label, onClick }: FooterButtonProps) => {
  if (onClick && typeof onClick !== "function") {
    throw Error(
      "The onClick handler for a Footer Button must be a callable function."
    );
  }
  return (
    <WhiteTextButton size="small" onClick={onClick}>
      {label}
    </WhiteTextButton>
  );
};

export default function Footer({ lhs, rhs }: Props) {
  return (
    <footer className="bg-black">
      <div className="flex justify-between px-3">
        <div className="flex flex-col justify-start">
          {lhs && lhs.map(FooterButton)}
        </div>
        <div className="flex flex-col justify-end">
          {rhs && rhs.map(FooterButton)}
        </div>
      </div>
    </footer>
  );
}
