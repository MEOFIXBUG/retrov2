import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import BoardItem from './BoardItem';
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    }
}));

export default function Boards() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await fetch('https://retrov8.herokuapp.com/api/boards');
            const result = await response.json();
            if (result.success) {
                setIsLoaded(true);
                setItems(result.data);
            }
            else {
                setIsLoaded(true);
                setError(result.message);
            }
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state
    if (error) {
        return <div>Error: {error}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            <BoardItem item={item}></BoardItem>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}
