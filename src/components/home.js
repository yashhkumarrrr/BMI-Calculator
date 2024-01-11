import './home.css';
import * as yup from 'yup';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const validationSchema = yup.object({
    height: yup
        .number('Enter your Height')
        .required('Height is Required'),
    weight: yup
        .number('Enter your Weight')
        .required('Weight is Required'),
});

function Home() {

    const [result, setResult] = useState('');

    const formik = useFormik({
        initialValues: {
            height: '',
            weight: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => {
            setResult(formik.values.weight / (formik.values.height * formik.values.height));
        },
    });

    const theme = createTheme({
        typography: {
            body1: {
                fontSize: '1.1rem',
                fontFamily: 'Poppins',
                '@media (max-width: 950px)': {
                    fontSize: '1rem',
                },
                '@media (max-width: 550px)': {
                    fontSize: '0.9rem',
                },
                '@media (max-width: 450px)': {
                    fontSize: '0.8rem',
                },
            }
        },
    });

    return (
        <>
            <div className='home-body'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='home-section'>
                        <div className='home-heading'>
                            BMI Calculator
                        </div>

                        <div className='home-display'>
                            <div className='home-input'>
                                <ThemeProvider theme={theme}>
                                    <Typography variant='body1'>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            name='height'
                                            type='number'
                                            variant='standard'
                                            label='Enter Height (m) *'
                                            value={formik.values.height}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.height && formik.errors.height}
                                            error={formik.touched.height && Boolean(formik.errors.height)}
                                        />
                                    </Typography>
                                </ThemeProvider>
                            </div>

                            <div className='home-input'>
                                <ThemeProvider theme={theme}>
                                    <Typography variant='body1'>
                                        <TextField
                                            fullWidth
                                            size='small'
                                            name='weight'
                                            type='number'
                                            variant='standard'
                                            label='Enter Weight (kg) *'
                                            value={formik.values.weight}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.weight && formik.errors.weight}
                                            error={formik.touched.weight && Boolean(formik.errors.weight)}
                                        />
                                    </Typography>
                                </ThemeProvider>
                            </div>
                        </div>

                        <div className='home-btn-submit'>
                            <Button
                                type='submit'
                                variant='contained'
                                id='home-btn-submit'
                            >
                                Submit
                            </Button>
                        </div>

                        <div className='home-result-display'>
                            <ThemeProvider theme={theme}>
                                <Typography variant='body1'>
                                    <TextField
                                        focused
                                        fullWidth
                                        value={result}
                                        color='secondary'
                                        variant='outlined'
                                        label='Body Mass Index'
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Typography>
                            </ThemeProvider>
                        </div>
                    </div>
                </form>

                <div className='footer-body'>
                    Design and Developed by -&nbsp;
                    <Tooltip title='Yash Kumar' arrow placement='top'>
                        <Link
                            target='_blank'
                            id='footer-link'
                            to='https://yashhkumarrrr.netlify.app'
                        >
                            Yash
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}

export default Home;