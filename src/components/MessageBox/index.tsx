import { FC } from "react";
import s from "./styles.module.scss";
import { Typography } from "@material-ui/core";

interface Props {
  icon: string;
  text: string;
}

const MessageBox: FC<Props> = ({ icon, text }) => {
  return (
    <div className={s.messageBox}>
      <span className={s.icon} role="img">
        {icon}
      </span>
      <Typography variant="h6">{text}</Typography>
    </div>
  );
};
export default MessageBox;
