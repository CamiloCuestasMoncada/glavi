import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
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
import { createMuiTheme } from '@material-ui/core/styles';

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
  bgColor: {
    backgroundColor: '#eaeaf0',
  },
  
  stepIcon: {
    color: "pink"
  },

  
  step: {
    "&$completed": {
      color: "#85cfe8"
    },
    "&$active": {
      color: "#d49de9"
    },
    
  },
  alternativeLabel: {},
  active: {}, //needed so that the &$active tag works
  completed: {},
  disabled: {},
  labelContainer: {
    "&$alternativeLabel": {
      marginTop: 0
    },
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
  const [zona, setZona] = useState("");
  const [realEstate, setRealEstate] = useState("inmueble");
  const mensajeFinal = () => {
    return (
      <div>{`Hola Scarleth, el cliente ${nombre} tiene interes en vender su ${realEstate},  cuya ubicación se encuentra en  ${zona}, escribele a: ${mail} o puedes llamar al ${telefono} contactale lo antes posible. ¡Éxitos!`}</div>
    );
  };

  const SelectForm = () => {
    const {
      register,
      handleSubmit,
      watch,
      errors,
      setValue,
      control,
    } = useForm();
    const onSubmit = (data) => {
      setRealEstate(
        JSON.stringify(data.realEstate.label).replace(/['"]+/g, "")
      );
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Elija el tipo de propiedad</label>
        <Controller
          name="realEstate"
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
          defaultValue="Inmueble"
          
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

  const InputForm = (props) => {
    /*const { register, handleSubmit, watch, errors, setValue } = useForm();*/
    const { register, errors, handleSubmit } = useForm({
      criteriaMode: "all",
    });
    const [info, setInfo] = useState("");
    const handleChangue = (event) => {
      setInfo(event.target.value);
      console.log(info);
    };

    const onSubmit = (data) => {
      if (props.typeId === "name") {
        setNombre(`${JSON.stringify(data.name).replace(/['"]+/g, "")}`);
      } else if (props.typeId === "mail") {
        setMail(`${JSON.stringify(data.email).replace(/['"]+/g, "")}`);
      } else if (props.typeId === "phone") {
        setTelefono(`${JSON.stringify(data.phone).replace(/['"]+/g, "")}`);
      } else if (props.typeId === "zona") {
        setZona(`${JSON.stringify(data.text).replace(/['"]+/g, "")}`);
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
          ref={register({
            required: "Este campo no puede estar vacio.",

            maxLength: {
              value: 35,
              message: "El nombre es muy largo",
            },
          })}
          className={styles.input}
          onChange={handleChangue}
        />

        <ErrorMessage
          errors={errors}
          name={props.name}
          render={({ messages }) => {
            console.log("messages", messages);
            return messages
              ? Object.entries(messages).map(([type, message]) => (
                  <p key={type} className={styles.errorMensaje}>
                    {message}
                  </p>
                ))
              : null;
          }}
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
            typeId={"name"}
          />
        );

      case 1:
        return (
          <InputForm
            name={"email"}
            placeholder={"ejemplo@mimail.com"}
            type={"email"}
            typeId={"mail"}
          />
        );
      case 2:
        return (
          <InputForm
            name={"phone"}
            placeholder={"+57"}
            type={"phone"}
            typeId={"phone"}
          />
        );
      case 3:
        return (
          <InputForm
            name={"text"}
            placeholder={""}
            type={"text"}
            typeId={"zona"}
          />
        );
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
        <Stepper  activeStep={activeStep} orientation="vertical" > 
          {steps.map((label, index) => (
            <Step key={label} >
              <StepLabel classes={{
            alternativeLabel: classes.alternativeLabel,
            labelContainer: classes.labelContainer
          }}
          StepIconProps={{
            classes: {
              root: classes.step,
              completed: classes.completed,
              active: classes.active,
              
            }
          }}>{label}</StepLabel>
              <StepContent >
                <div >{getStepContent(index)}</div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography >
              <b>Has completado todos los pasos</b>, en breve nos comunicaremos
              contigo, gracias por contar con <b>glavi</b>, tu inmobiliaria de
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


