import { FC } from "react";
import s from "./styles.module.scss";
import {
  Typography,
  ListItem,
  ListItemSecondaryAction,
} from "@material-ui/core";
import classNames from "classnames";

interface Props {
  data: {
    name: string;
    forks_count: number;
    stargazers_count?: number;
  };
}

const UserItem: FC<Props> = ({ data }) => {
  const { name, forks_count, stargazers_count } = data;
  return (
    <ListItem className={classNames("list-item", "repo", s.listItem)}>
      <Typography variant="h5">{name}</Typography>
      <ListItemSecondaryAction>
        <Typography className={s.text} variant="h6">
          {forks_count} Forks
        </Typography>
        <Typography className={s.text} variant="h6">
          {stargazers_count || 0} Stars
        </Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default UserItem;
