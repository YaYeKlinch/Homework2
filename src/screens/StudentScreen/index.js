import React, {useCallback, useEffect, useState} from 'react';
import * as APIService from '../../services/APIService';
import {Button, Container, makeStyles, TextField, Typography,} from '@material-ui/core';
import {Link, Redirect} from 'react-router-dom';
import {Field, Form} from 'react-final-form';
import {checkStudentId} from "../../services/APIService";


const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(4),
    },
    field: {
        marginBottom: theme.spacing(2),
    },
}));

const StudentScreen = ({match, history}) => {
    const studentId = match.params.studentId;

    const [student, setStudent] = useState(null);

    useEffect(() => {
        if (studentId) {
            const currentStudent = APIService.getStudent(studentId);
            setStudent(currentStudent);
        }
    }, [studentId]);

    const handleFormSubmit = useCallback(
        values => {
            if (studentId) {
                APIService.updateStudent(studentId, values);
            } else {
                APIService.addStudent(values);
            }
            history.push('/students');
        },
        [studentId, history]
    );
    const validate = async values => {
        const errors = {};
        const checkImage = new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = function () {
                resolve(true);
            };
            img.onerror = function () {
                reject(false);
            };
            img.src = values.avatar;
        });
        await checkImage.then(null,
            () => {
                errors.avatar = true
            }
        );
        const regNameTest = new RegExp("\\w{3,}\\s+\\w{3,}");
        if (!regNameTest.test(values.name)) {
            errors.name = true;
        }
        const regAddTest = new RegExp("[\\w+\\s*\\-]+\\,[\\d\\s*|\\/]+");
        if (!regAddTest.test(values.address)) {
            errors.address = true;
        }
        return errors;
    };

    const classes = useStyles();

    if (studentId) {
        if(!checkStudentId(studentId))
        return (
            <Redirect to="/error404"/>
        );
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h6" className={classes.title}>
                {studentId ? 'Update student' : 'Add student'}
            </Typography>
            <Form onSubmit={handleFormSubmit} validate={validate} initialValues={student}>
                {({handleSubmit}) => (
                    <>
                        <Field name="avatar">
                            {({input, meta}) => (
                                <TextField
                                    error={meta.error && meta.touched}
                                    className={classes.field}
                                    label="Avatar URL"
                                    variant="outlined"
                                    fullWidth
                                    {...input}
                                />
                            )}
                        </Field>
                        <Field name="name">
                            {({input, meta}) => (
                                <TextField
                                    error={meta.error && meta.touched}
                                    className={classes.field}
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    {...input}
                                />
                            )}
                        </Field>
                        <Field name="address">
                            {({input, meta}) => (
                                <TextField
                                    error={meta.error && meta.touched}
                                    className={classes.field}
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    {...input}
                                />
                            )}
                        </Field>
                        <Button
                            onClick={handleSubmit}
                            fullWidth
                            color="primary"
                            variant="contained"
                            size="large"
                            className={classes.submitButton}
                        >
                            Add
                        </Button>
                        {studentId && (
<Button
    component={Link}
    to={`/students/delete/${studentId}`}
    fullWidth
    color="secondary"
    variant="oulined"
    size="large"
>
    Delete student
</Button>
)}
                    </>
                )}
            </Form>
        </Container>
    );
};

export default StudentScreen;
