/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

function getSlotLetrasValue(request, slotName) {
    // assumes the first resolved value's id is the desired one
    const slot = request.intent.slots[slotName]

    if (slot &&
         slot.value &&
         slot.resolutions &&
         slot.resolutions.resolutionsPerAuthority &&
         slot.resolutions.resolutionsPerAuthority[0] &&
         slot.resolutions.resolutionsPerAuthority[0].values &&
         slot.resolutions.resolutionsPerAuthority[0].values[0] &&
         slot.resolutions.resolutionsPerAuthority[0].values[0].value &&
         slot.resolutions.resolutionsPerAuthority[0].values[0].value.name) {
         return slot.resolutions.resolutionsPerAuthority[0].values[0].value.name
    }
    return null
 
}

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        var speakOutput = 'Bem vindo, a Cela Bráile. Pergunte como escreve uma letra do abecedário em Bráile ou cómo funciona a cela Bráile';
        const respostaDuvida = 'Você pode perguntar como escreve alguma letra em Bráile ou perguntar como funciona a cela Bráile.'

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(respostaDuvida)
            .getResponse();
    }
};

const CelaIntentHandler = {
     canHandle(handlerInput) {
         return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
             && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CelaIntent';
     },
     handle(handlerInput) {
         const speakOutput = 'A cela bráile é composta por duas colunas e três linhas, numeradas de cima a baixo, da esquerda para direita, de um a seis, a primeira posição ocupa o espaço correspondente a coluna um e linha um, já a sexta posição ocupa o espaço da coluna dois e linha três.';

         return handlerInput.responseBuilder
             .speak(speakOutput)
             .getResponse();
     }
 };
 
const LetrasIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LetrasIntent';
    },
    handle(handlerInput) {
       
        let ltPontos = "";
        
        let ltLetra = getSlotLetrasValue(handlerInput.requestEnvelope.request, 'varletras')
        
        if (ltLetra === 'A') {
            ltPontos = 'ponto. 1';
        }
        if (ltLetra === 'B') {
            ltPontos = 'pontos. 1 e 2';
        }
        if (ltLetra === 'C') {
            ltPontos = 'pontos. 1 e 4';
        }
        if (ltLetra === 'D') {
            ltPontos = 'pontos. 1 2 e 5';
        }
        if (ltLetra === 'E') {
            ltPontos = 'pontos. 1 e 5';
        }
        if (ltLetra === 'F') {
            ltPontos = 'pontos. 1, 2 e 4';
        }
        if (ltLetra === 'G') {
            ltPontos = 'pontos. 1 2, 4 e 5';
        }
        if (ltLetra === 'H') {
            ltPontos = 'pontos. 1 2 e 5';
        }
        if (ltLetra === 'I') {
            ltPontos = 'pontos. 2 e 4';
        }
        if (ltLetra === 'J') {
            ltPontos = 'pontos. 2, 4 e 5';
        }
        if (ltLetra === 'L') {
            ltPontos = 'pontos. 1 2 e 3';
        }
        if (ltLetra === 'M') {
            ltPontos = 'pontos. 1 3 e 4';
        } 
        if (ltLetra === 'N') {
            ltPontos = 'pontos. 1 3, 4 e 5';
        }
        if (ltLetra === 'O') {
            ltPontos = 'pontos. 1 3 e 4';
        }
        if (ltLetra === 'P') {
            ltPontos = 'pontos. 1 2, 3 e 4';
        }
        if (ltLetra === 'Q') {
            ltPontos = 'pontos. 1 2, 3, 4 e 5';
        }
        if (ltLetra === 'R') {
            ltPontos = 'pontos. 1 2, 3 e 5';
        }
        if (ltLetra === 'S') {
            ltPontos = 'pontos. 2 3 e 4';
        } 
        if (ltLetra === 'T') {
            ltPontos = 'pontos. 2 3, 4 e 5';
        }
        if (ltLetra === 'U') {
            ltPontos = 'pontos. 1 3 e 6';
        }
        if (ltLetra === 'V') {
            ltPontos = 'pontos. 1 2, 3 e 6';
        } 
        if (ltLetra === 'X') {
            ltPontos = 'pontos. 1 3, 4 e 6';
        }
        if (ltLetra === 'Z') {
            ltPontos = 'pontos. 1 3, 4 e 5';
        }
        if (ltLetra === 'K') {
            ltPontos = 'pontos. 1 e 3';
        } 
        if (ltLetra === 'Y') {
            ltPontos = 'pontos. 1 3, 4, 5 e 6';
        }
        if (ltLetra === 'W') {
            ltPontos = 'pontos. 2, 4, 5 e 6';
        }
        
        let speechText = 'Não entendi, poderia me falar uma letra?';
        
        if (ltLetra){
            speechText = `Letra. ${ltLetra} . ${ltPontos} . `;
            speechText += 'Para uma nova consulta, basta perguntar uma nova letra ou falar não, para finalizar a cela Bráile';
        }
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt('Precisa de ajuda?, pergunta-me uma nova letra.')
            .withShouldEndSession(false)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Você pode perguntar como escreve alguma letra em Bráile ou perguntar como funciona o a cela Bráile.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Obrigado! até breve.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withShouldEndSession(true)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Desculpa, não entendi. Porfavor, repita a frase.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Desculpa, eu tive um problema com a sua pergunta. Porfavor tente novamente.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        LetrasIntentHandler,
        CelaIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();