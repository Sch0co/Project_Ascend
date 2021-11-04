import { React, useState } from "react";
import "./index.css";
import { ReactComponent as ModalClose } from "../../icon/mainIcon/x_close.svg";
import MenuBar from "../../components/MenuBar";
import CharacterSet from "../../components/CharacterSet";
import CharaStatus from "../../components/CharaStatus";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import GameStage from "../../components/GameStage";

const stages = [
  {
    key: 1,
    name: "1F",
  },
  {
    key: 2,
    name: "2F",
  },
  {
    key: 3,
    name: "3F",
  },
  {
    key: 4,
    name: "4F",
  },
  {
    key: 5,
    name: "5F",
  },
  {
    key: 6,
    name: "6F",
  },
  {
    key: 7,
    name: "7F",
  },
  {
    key: 8,
    name: "8F",
  },
  {
    key: 9,
    name: "9F",
  },
  {
    key: 10,
    name: "10F",
  },
  {
    key: 11,
    name: "11F",
  },
  {
    key: 12,
    name: "12F",
  },
  {
    key: 13,
    name: "13F",
  },
  {
    key: 14,
    name: "14F",
  },
  {
    key: 15,
    name: "15F",
  },
  {
    key: 16,
    name: "16F",
  },
  {
    key: 17,
    name: "17F",
  },
  {
    key: 18,
    name: "18F",
  },
  {
    key: 19,
    name: "19F",
  },
  {
    key: 20,
    name: "20F",
  },
];

const characterStyle = {
  overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
      backgroundColor: "#fff",
      maxWidth: "700px",
      margin: "0 auto",
  }
}

const stageStyle = {
  overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
      backgroundColor: "#fff",
      maxWidth: "700px",
      margin: "0 auto",
  }
}


const Main = () => {
  const [isCharacter, setIsCharacter] = useState(false);
  const [stage, setStage] = useState(false);
  
  const characterOpen = () => {
    setIsCharacter(true);
  }
  
  const characterClose = () => {
    setIsCharacter(false);
  }

  const stageOpen = () => {
    setStage(true);
  }
  
  const stageClose = () => {
    setStage(false);
  }
  
  const history = useHistory();
  
  const onGame = () => {
    history.push("/main/game");
  }

  return (
    <div className="mainWindow">
      <MenuBar />
      <div className="mainView">
        <div className="mainInfo">
          <div className="mainInfoTop">
            <div className="mainInfoStatus">
              캐릭터 스탯
            </div>
            <CharaStatus />
          </div>
          <div className="mainSetting">
            <div
              className="mainIngoStaSet"
              style={{
                marginRight: 20
              }}  
            >
              <button className="mainStaBtn" onClick={characterOpen}>
                캐릭터 세팅
              </button>
            </div>
            <Modal
              isOpen={isCharacter}
              onRequestClose={characterClose}
              style={characterStyle}
            >
              <CharacterSet />
            </Modal>
            <div className="mainStartBtn">
              <button 
                className="startBtn"
                onClick={stageOpen}
              >
                모험 출발
              </button>
            </div>
          </div>
        </div>
              <Modal
              isOpen={stage}
              onRequestClose={stageClose}
              style={stageStyle}
              >
                <div className="stageTop">
                  <div>스테이지</div>
                  <ModalClose
                    onClick={stageClose}
                    style={{
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                    }}
                  />
                </div>
                  {stages.map((stair) => (
                    <GameStage data={stair} />
                  ))}
              </Modal>
        <div className="mainItem">
          <div className="mainItemTop">최근 획득 장비</div>
          <div className="mainItemList">
            목록 ~~
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
