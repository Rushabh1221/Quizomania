import React, { Component } from 'react';
import "./assets/style.css";
import quizService from "./quizService";
import QuesBox from "./Components/QuesBox.js";
import Result from "./Components/Result.js";

export default class Quizomania extends Component {
    state = {
        questionBank: [],
        score: 0, 
        responses: 0
    };

    getQues = () => {
        quizService().then( question => {
            this.setState({questionBank: question})
        });
    };

   computeAnswer = (answer, correctAnswer) => {
       if (answer === correctAnswer) {
           this.setState({ score: this.state.score + 1 });
       }
       this.setState({ responses: this.state.responses < 5 ? this.state.responses + 1 : 5 })
   }

   playAgain = () => {
       this.getQues();
       this.setState({
           score: 0, 
           responses: 0
       });
   }

    componentDidMount() {
        this.getQues();
    }
    
    render() {
        return (
            <div className="container">
                <div className="title">Quizomania</div>
                {this.state.questionBank.length > 0 && this.state.responses < 5 && this.state.questionBank.map(({question, answers, correct, questionId}) => (
                    <QuesBox 
                      question={ question } 
                      option={ answers } 
                      key={ questionId }
                      selected={ answer => this.computeAnswer(answer, correct) }
                    />
                )
                )}
                {this.state.responses === 5 ? ( <Result score={this.state.score} playAgain={this.platAgain}/> ) : null}
            </div>
        );
    }
}

