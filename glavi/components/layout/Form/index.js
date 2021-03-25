import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styles from "./Form.module.css";
import Select from "react-select";

const SelectForm = () => {
  const { control, handleSubmit } = useForm();

  return (
    <>
      <label>Elija el tipo de propiedad</label>
      <Controller
        name="tipopDePropiedad"
        as={Select}
        options={[
          { value: "Casa", label: "Casa" },
          { value: "Apartamento", label: "Apartamento" },
          { value: "Oficina", label: "Oficina" },
          { value: "Local", label: "Local Comercial" },
          { value: "Finca", label: "Finca" },
          { value: "Lote", label: "Lote" },
          { value: "Bodega", label: "Bodega" },
        ]}
        control={control}
        defaultValue=""
      />
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return [
    "Nombre y Apellido:",
    "E-mail:",
    "Telefono:",
    "zona:",
    "Tipo de propiedad:",
    "metros cuadrados (opcional):",
  ];
}

export default function Form() {
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [telefono, setTelefono] = useState("");
  const mensajeFinal = () => {
    return (
      <div>{`Hola Scarleth, el cliente ${nombre} esta inetresado en vender, su email es: ${mail} y su telefono ${telefono}`}</div>
    );
  };

  const InputForm = (props) => {
    const { register, handleSubmit, watch, errors, setValue } = useForm();
    const [info, setInfo] = useState("");
    const handleChangue = (event) => {
      setInfo(event.target.value);
      console.log(info);
    };

    const onSubmit = (data) => {
      if (props.tipo === "name") {
        setNombre(`${JSON.stringify(data).replace(/['"]+/g, "")}`);
      } else if (props.tipo === "mail") {
        setMail(`${JSON.stringify(data).replace(/['"]+/g, "")}`);
      } else if (props.tipo === "telefono") {
        setTelefono(`${JSON.stringify(data).replace(/['"]+/g, "")}`);
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    /*function validar () {
        handleSubmit(onSubmit);
      };*/

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
          ref={register({ required: true, maxLength: 35 })}
          className={styles.input}
          onChange={handleChangue}
        />

        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          className={classes.button}
        >
          Atras
        </Button>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          {activeStep === steps.length - 1 ? "Confirmar" : "Siguiente"}
        </Button>
      </form>
    );
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <InputForm
            name={"name"}
            placeholder={""}
            type={"name"}
            tipo={"name"}
          />
        );

      case 1:
        return (
          <InputForm
            name={"email"}
            placeholder={"ejemplo@mimail.com"}
            type={"email"}
            tipo={"mail"}
          />
        );
      case 2:
        return (
          <InputForm
            name={"phone"}
            placeholder={"+57"}
            type={"phone"}
            tipo={"telefono"}
          />
        );
      case 3:
        return <InputForm name={"text"} placeholder={""} type={"text"} />;
      case 4:
        return <SelectForm />;
      case 5:
        return <InputForm name={"text"} placeholder={""} type={"text"} />;
      default:
        return "Unknown step";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      {/*activeStep === 0 ? (
    <InfoForm />
      ) : <div>ohh</div>*/}
      <h2 className={styles.title}>
        Completa el formulario y nos pondremos en contacto lo antes posible para
        continuar con el proceso.
      </h2>
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <div>{getStepContent(index)}</div>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Atras
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1
                        ? "Confirmar"
                        : "Siguiente"}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>
              <b>Has completado todos los pasos</b>, en breve nos comunicaremos
              contigo, gracias por confiar en <b>glavi</b>, tu inmobiliaria de
              confianza.
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reiniciar
            </Button>
            {mensajeFinal()}
          </Paper>
        )}
      </div>
    </div>
  );
}
