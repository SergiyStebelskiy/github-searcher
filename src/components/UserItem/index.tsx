import { FC } from "react";
import s from "./styles.module.scss";
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import classNames from "classnames";
import { Link } from "react-router-dom";

interface Props {
  data: {
    avatar_url: string;
    id: string | number | null;
    name: string;
    public_repos: number;
    login: string | null;
  };
}

const UserItem: FC<Props> = ({ data }) => {
  const { avatar_url, name, public_repos, login, id } = data;
  return (
    <Link to={`/users/${id}`}>
      <ListItem className={classNames("list-item", s.listItem)}>
        <ListItemAvatar>
          <Avatar
            variant="rounded"
            className={s.avatar}
            src={avatar_url}
          ></Avatar>
        </ListItemAvatar>
        <Typography variant="h5">{name || login}</Typography>
        <ListItemSecondaryAction>
          <Typography variant="h6">Repo: {public_repos}</Typography>
        </ListItemSecondaryAction>
      </ListItem>
    </Link>
  );
};
export default UserItem;
