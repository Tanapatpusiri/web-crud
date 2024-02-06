import * as React from "react";
import { useState } from "react";
import { Box, Grid, colors } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import IconBin from "../image/bin.png";
import Plus from "../image/plus.png";
import Image from "next/image";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import duplicate from "../image/duplicate.png";
import Divider from "@mui/material/Divider";
import _ from "lodash";

export default function Home() {
  const [AllQuestions, SetQuestion] = useState([
    {
      Question: "",
      Descriptions: [
        {
          DescriptionDetail: "",
          Check: false,
          Text: "",
          Error: false,
          ErrorMessage: "",
        },
        {
          DescriptionDetail: "",
          Check: false,
          Text: "",
          Error: false,
          ErrorMessage: "",
        },
      ],
    },
  ]);

  const [NameQuestionaire, SetNameQuestionnaire] = useState("");

  const HandelCancel = () => {
    SetNameQuestionnaire("");
    SetQuestion([
      {
        Question: "",
        Descriptions: [
          {
            DescriptionDetail: "",
            Check: false,
            Text: "",
            Error: false,
            ErrorMessage: "",
          },
          {
            DescriptionDetail: "",
            Check: false,
            Text: "",
            Error: false,
            ErrorMessage: "",
          },
        ],
      },
    ]);
  };
  const HandleAddDescription = (i: number) => {
    SetQuestion((prevTodos) => {
      const Questions = [...prevTodos];

      Questions[i].Descriptions.push({
        DescriptionDetail: "",
        Check: false,
        Text: "",
        Error: false,
        ErrorMessage: "",
      });

      return Questions;
    });
  };

  const HandleChangeDescription = (e, x, i) => {
    var Question = _.cloneDeep(AllQuestions);
    const { name, value } = e.target;
    Question[i].Descriptions[x][name] = value;
    Question[i].Descriptions[x].Error = false;
    Question[i].Descriptions[x].ErrorMessage = "";
    SetQuestion(Question);
    console.log(AllQuestions);
  };

  const DuplicateQuestion = (i: number) => {
    const Questions = _.cloneDeep(AllQuestions);
    const NewDes = _.cloneDeep(AllQuestions[i].Descriptions);
    Questions.push({
      Question: Questions[i].Question,
      Descriptions: NewDes,
    });

    SetQuestion(Questions);
  };

  const HandleAddQuestion = () => {
    const Questions = _.cloneDeep(AllQuestions);
    Questions.push({
      Question: "",
      Descriptions: [
        {
          DescriptionDetail: "",
          Check: false,
          Text: "",
          Error: false,
          ErrorMessage: "",
        },
        {
          DescriptionDetail: "",
          Check: false,
          Text: "",
          Error: false,
          ErrorMessage: "",
        },
      ],
    });
    SetQuestion(Questions);
    console.log(Questions);
  };

  const HandleChangeQuestion = (e, i) => {
    const { name, value } = e.target;
    const Questions = _.cloneDeep(AllQuestions);
    Questions[i][name] = value;
    SetQuestion(Questions);
    console.log(Questions);
  };

  const onChangeCheck = (e, x, i) => {
    const Questions = _.cloneDeep(AllQuestions);
    const Data = [...Questions];
    Data[i].Descriptions.map((data, index) => {
      if (x == index) {
        data.Check = true;
        data.Text = "This answer is correct!";
      } else {
        data.Check = false;
        data.Text = "";
      }
    });

    SetQuestion(Questions);
  };

  const HandelDelateDes = (x, i) => {
    const Questions = _.cloneDeep(AllQuestions);
    Questions[i].Descriptions.splice(x, 1);
    SetQuestion(Questions);
    console.log(Questions);
  };

  const DeleteQuestion = (index: number) => {
    const DeleteQ = _.cloneDeep(AllQuestions);
    DeleteQ.splice(index, 1);
    SetQuestion(DeleteQ);
  };

  const HandelFormSave = (e) => {
    e.preventDefault();

    var Question = _.cloneDeep(AllQuestions);
    const NewQues = [...Question];

    NewQues.map((data) => {
      data.Descriptions.map((Indata) => {
        console.log(Indata);

        if (Indata.DescriptionDetail === "") {
          Indata.Error = true;
          Indata.Check = false;
          Indata.ErrorMessage = "Please fill this option";
          Indata.Text = "";
        } else {
          Indata.Error = false;
        }
      });
    });
    SetQuestion(NewQues);
  };

  return (
    <form onSubmit={HandelFormSave}>
      <Box
        sx={{
          bgcolor: "#ffff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            paddingLeft: 2,
          }}
        >
          <h3>🦊 Foxbith Questionnaire</h3>
        </Box>

        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 1,
            paddingBottom: 1,
            paddingRight: 2,
          }}
        >
          <Button color="error" variant="outlined" onClick={HandelCancel}>
            Cancel
          </Button>
          <Button
            color="error"
            type="submit"
            variant="contained"
            sx={{ ml: 2, width: 150 }}
          >
            Save
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          paddingLeft: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: "#ffff",
            borderRadius: 2,
          }}
        >
          <Box
            className="TextQuestion"
            sx={{
              paddingLeft: 2,
              paddingRight: 2,
            }}
          >
            <h4>Questionnaire Detail</h4>
            <TextField
              id="outlined-basic"
              label="Name*"
              variant="outlined"
              size="small"
              fullWidth
              value={NameQuestionaire}
              onChange={(e) => {
                SetNameQuestionnaire(e.target.value);
              }}
              InputProps={{
                style: {
                  borderRadius: "10px",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              paddingTop: 5,
            }}
          >
            <Divider />
          </Box>

          {AllQuestions.map((Val, i) => (
            <div key={i}>
              <Box
                sx={{
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                <h4>Question {i + 1}</h4>
                <TextField
                  id="outlined-basic"
                  label="Question*"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={Val.Question}
                  name="Question"
                  onChange={(e) => {
                    HandleChangeQuestion(e, i);
                  }}
                  InputProps={{
                    style: {
                      borderRadius: "10px",
                    },
                  }}
                />
                <Box
                  sx={{
                    padding: 2,
                  }}
                >
                  {Val.Descriptions.map((Des, x) => (
                    <div key={x}>
                      <FormControl>
                        <RadioGroup
                          name="DescriptionDetail"
                          onChange={(e) => {
                            onChangeCheck(e, x, i);
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Radio checked={Des.Check} color="success" />
                            }
                            value={x}
                            label={
                              <TextField
                                error={Des.Error ? true : false}
                                label="Description*"
                                size="small"
                                value={Des.DescriptionDetail}
                                onChange={(e) => {
                                  HandleChangeDescription(e, x, i);
                                }}
                                name="DescriptionDetail"
                                className="InputDes"
                                sx={{
                                  width: {
                                    xs: 190,
                                    sm: 400,
                                    md: 700,
                                    lg: 1000,
                                  },
                                }}
                              />
                            }
                          />

                          <Box sx={{}}>
                            <p className="Text">{Des.Text}</p>
                            <p className="Text" style={{ color: "red" }}>
                              {Des.ErrorMessage}
                            </p>
                          </Box>
                        </RadioGroup>
                      </FormControl>

                      <Image
                        onClick={() => {
                          HandelDelateDes(x, i);
                        }}
                        src={IconBin}
                        priority
                        width={20}
                        alt=""
                        style={{ paddingTop: 10 }}
                      />
                    </div>
                  ))}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      paddingRight: 2,
                    }}
                  >
                    <Image
                      onClick={() => HandleAddDescription(i)}
                      src={Plus}
                      priority
                      width={15}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                  </Box>
                  <Box>
                    <h4
                      onClick={() => HandleAddDescription(i)}
                      style={{ color: "#FF5C00", cursor: "pointer" }}
                    >
                      ADD CHOICE
                    </h4>
                  </Box>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",

                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    <Image
                      onClick={() => DuplicateQuestion(i)}
                      src={duplicate}
                      priority
                      width={20}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <h4
                      onClick={() => DuplicateQuestion(i)}
                      style={{ cursor: "pointer", padding: 15 }}
                    >
                      Duplicate
                    </h4>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Image
                      onClick={() => DeleteQuestion(i)}
                      src={IconBin}
                      priority
                      width={20}
                      alt=""
                      style={{ cursor: "pointer" }}
                    />
                    <h4
                      onClick={() => DeleteQuestion(i)}
                      style={{ cursor: "pointer", padding: 15 }}
                    >
                      Delete
                    </h4>
                  </Box>
                </Box>
              </Box>
              <Divider />
            </div>
          ))}
          <Box
            sx={{
              paddingRight: 4,
            }}
          >
            <Button
              sx={{ margin: 2 }}
              color="error"
              variant="outlined"
              onClick={HandleAddQuestion}
              fullWidth
            >
              + Add Question
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
}