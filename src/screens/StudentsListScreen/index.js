import React from 'react';

import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListSubheader,
    Fab,
    makeStyles,
    ListItemSecondaryAction,
    IconButton,
} from '@material-ui/core';
import {AddBoxSharp as AddIcon, DeleteForever} from '@material-ui/icons';
import StudentsList from '../common/StudentsList';
import {Link} from 'react-router-dom';


const useStyles = makeStyles(theme => ({
    list: {
        paddingBottom: theme.spacing(10),
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <>
            <List className={classes.list}>
                <ListSubheader>Students</ListSubheader>
                <StudentsList>
                    {({students}) =>
                        students.map(student => (
                            <ListItem
                                key={student.id}
                                button
                                component={Link}
                                to={`/students/${student.id}`}
                            >
                                <ListItemAvatar>
                                    <Avatar src={student.avatar}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={student.name}
                                    secondary={student.address}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete Todo"
                                                component={Link}
                                                to={`/students/delete/${student.id}`}
                                                color="primary"
                                                variant="outlined">
                                        <DeleteForever />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }
                </StudentsList>
            </List>
            <Fab
                className={classes.fab}
                color="primary"
                component={Link}
                to="/students/create"
            >
                <AddIcon/>
            </Fab>
        </>
    );
};
