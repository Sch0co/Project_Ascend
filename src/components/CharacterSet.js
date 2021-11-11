import React, { useState, useEffect } from "react";
import "./CharacterSet.css";
import { ReactComponent as User } from "../icon/mainIcon/user.svg";
import { ReactComponent as Hp } from "../icon/mainIcon/heart-solid.svg";
import { ReactComponent as Armor } from "../icon/mainIcon/armor.svg";
import { ReactComponent as Damage } from "../icon/mainIcon/swords.svg";
import { ReactComponent as Coin } from "../icon/mainIcon/coins.svg";
import { ReactComponent as Check } from "../icon/mainIcon/check.svg";
import { ReactComponent as NoCheck } from "../icon/mainIcon/nocheck.svg";
// import { ReactComponent as ModalClose } from "../icon/mainIcon/x_close.svg";
import { Tooltip, notification, Modal } from 'antd';
import axios from "axios";

const CharacterSet = (props) => {
    const [sell, setSell] = useState(false);
    const [onSell, setOnSell] = useState(false);
    const [item, setItem] = useState([]);
    const [userData, setUserData] = useState(null);
    const [equiment, setEquiment] = useState([]);
    const [cSellModal, setCSellModal] = useState(false);
    const [bSellModal, setBSellModal] = useState(false);
    const [aSellModal, setASellModal] = useState(false);

    const loadEquiment = async() => {
        const res = await axios({
            method: 'get',
            url: '/equipment',
        });
        if(res.status === 200) {
            setEquiment(res.data);
        }
    }

    const loadUserData = async() => {
        const res = await axios({
            method: 'get',
            url: '/user',
        });
        if(res.status === 200) {
            setUserData(res.data);
        }
    }

    const loadInvenData = async() => {
        const res = await axios({
            method: 'get',
            url: '/inventory/item',
        });
        if(res.status === 200) {
            setItem(res.data);
        }

    }

    useEffect(() => {
        loadUserData();
        loadInvenData();
        loadEquiment();
    }, [])

    const releaseEquiment = async(v) => {
        if(item.length >= 300){
            notification.open({
                style: {
                    width: 300,
                },
                message: '안내',
                description: '인벤토리가 가득 차 해제할 수 없습니다.',
            });
            return;
        }
        const res = await axios({
            method: 'delete',
            url: '/equipment',
            data: {
                inventoryItemIdx: v.inventoryItemIdx
            }
        });
        if(res.status === 200) {
            loadUserData();
            loadInvenData();
            loadEquiment();
            props.onEquiment?.();
        }
    }


    const itemCheck = async(v, index) => {
        // 판매모드가 아닐경우
        if(!sell)
        {
            const res = await axios({
                method: 'post',
                url: '/equipment',
                data: {
                    inventoryItemIdx: v.inventoryItemIdx
                }
            });
            if(res.status === 200) {
                loadUserData();
                loadInvenData();
                loadEquiment();
                props.onEquiment?.();
            }
        }
        else
        {
            let copyData = [...item];
            copyData[index] = {
                ...copyData[index],
                isChecked: !copyData[index].isChecked,
            }
            setItem(copyData);
        }
    }

    const sellItem = async() => {
        let iCheck = item.filter((item) => (item.isChecked));
        if(iCheck?.length <= 0)
        {
            notification.open({
                style: {
                    width: 250,
                },
                message: '안내',
                description:
                    '체크한 장비가 없습니다.',
            });
            return;
        }
        iCheck = iCheck.map((item) => item.inventoryItemIdx);
        const res = await axios({
            method: 'post',
            url: '/item/sell',
            data: {
                inventoryItemIdxList: iCheck
            }
        });

        if(res.status === 200) {
            loadInvenData();
            loadUserData();
            props.onSellItem?.();
            notification.open({
                style: {
                    width: 250,
                },
                message: '판매',
                description:
                    '장비가 판매 되었습니다.',
            });
        }
    }

    const sellItemC = async() => {
        let cRank = item.filter((item) => (item.itemRank === "C"));
        if(cRank?.length <= 0)
        {
            setCSellModal(false);
            notification.open({
                style: {
                    width: 250,
                },
                message: '안내',
                description:
                    'C등급 장비가 없습니다.',
            });
            return;
        }
        cRank = cRank.map((item) => item.inventoryItemIdx);
        const res = await axios({
            method: 'post',
            url: '/item/sell',
            data: {
                inventoryItemIdxList: cRank
            }
        });

        if(res.status === 200) {
            loadInvenData();
            loadUserData();
            props.onSellItem?.();
            setCSellModal(false);
            notification.open({
                style: {
                    width: 250,
                },
                message: '판매',
                description:
                    '장비가 판매 되었습니다.',
            });
        }
    }

    const sellItemB = async() => {
        let bRank = item.filter((item) => (item.itemRank === "B"));
        if(bRank?.length <= 0)
        {
            setBSellModal(false);
            notification.open({
                style: {
                    width: 250,
                },
                message: '안내',
                description:
                    'B등급 장비가 없습니다.',
            });
            return;
        }
        bRank = bRank.map((item) => item.inventoryItemIdx);
        const res = await axios({
            method: 'post',
            url: '/item/sell',
            data: {
                inventoryItemIdxList: bRank
            }
        });

        if(res.status === 200) {
            loadInvenData();
            loadUserData();
            props.onSellItem?.();
            setBSellModal(false);
            notification.open({
                style: {
                    width: 250,
                },
                message: '판매',
                description:
                    '장비가 판매 되었습니다.',
            });
        }
    }

    const sellItemA = async() => {
        let aRank = item.filter((item) => (item.itemRank === "A"));
        if(aRank?.length <= 0)
        {
            setBSellModal(false);
            notification.open({
                style: {
                    width: 250,
                },
                message: '안내',
                description:
                    'A등급 장비가 없습니다.',
            });
            return;
        }
        aRank = aRank.map((item) => item.inventoryItemIdx);
        const res = await axios({
            method: 'post',
            url: '/item/sell',
            data: {
                inventoryItemIdxList: aRank
            }
        });

        if(res.status === 200) {
            loadInvenData();
            loadUserData();
            props.onSellItem?.();
            setASellModal(false);
            notification.open({
                style: {
                    width: 250,
                },
                message: '판매',
                description:
                    '장비가 판매 되었습니다.',
            });
        }
    }

    const onCrankSellModal = () => {
        setCSellModal(true);
    }

    const onCrankSellModalClose = () => {
        setCSellModal(false);
    }

    const onBrankSellModal = () => {
        setBSellModal(true);
    }

    const onBrankSellModalClose = () => {
        setBSellModal(false);
    }

    const onArankSellModal = () => {
        setASellModal(true);
    }

    const onArankSellModalClose = () => {
        setASellModal(false);
    }

    const onSellModeChange = () => {
        setSell(!sell);
        setOnSell(!onSell);
    }
    
    return (
        <div className="characterModal">
            <div className="characterSetTop">
                <div>캐릭터 세팅</div>
                {/* <ModalClose
                    onClick={characterClose}
                    style={{
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                    }}
                /> */}
            </div>
            <div className="characterSetList">
                <div className="charaSta">
                    <div className="charaGear">
                        <div className="gearTop">
                            캐릭터 장비
                        </div>
                        <div className="gearTab">
                            <div className="gear">
                                {
                                    equiment.filter((v) => v.itemType == "HELMET").length > 0 ?
                                    equiment.map((v) => 
                                        v.itemType == "HELMET" &&
                                        <Tooltip
                                            placement="right"
                                            color="rgba(0, 0, 0, 0.7)"
                                            title={() => 
                                                <div
                                                    style={{
                                                        display: "block"
                                                    }}
                                                >
                                                    <h3 style={{ color: "#FFF" }}>{v.name}</h3>
                                                    <div>
                                                        체력 +{v.hp.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        방어력 +{v.defense.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        데미지 +{v.damage.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        가격 {v.price.toLocaleString()}골드
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: 5,
                                                            borderTop: "1px solid #fff",
                                                            fontSize: 10,
                                                        }}
                                                    >
                                                        {v.description}
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <div
                                                onClick={() => releaseEquiment(v)}
                                                style={{
                                                    position: "relative",
                                                }}
                                            >
                                                <img
                                                    src={v.itemUrl}
                                                    style={{
                                                        objectFit: "contain",
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: -5,
                                                        right: -12,
                                                        zIndex: 1,
                                                        fontSize: 30,
                                                        fontWeight: "bold",
                                                        color: 
                                                        v.itemRank == "S" ? "#DED714"
                                                        : v.itemRank == "A" ? "#EC5C5C"
                                                        : v.itemRank == "B" ? "#00DEFF"
                                                        : "#FFF",
                                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                        width: 30,
                                                        height: 45,
                                                        borderBottomLeftRadius: 10,
                                                    }}
                                                >
                                                    {v.itemRank}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )
                                    :
                                    <div>
                                        헬멧
                                    </div>
                                }
                                {
                                    equiment.filter((v) => v.itemType == "ARMOR").length > 0 ?
                                    equiment.map((v) => 
                                        v.itemType == "ARMOR" &&
                                        <Tooltip
                                            placement="right"
                                            color="rgba(0, 0, 0, 0.7)"
                                            title={() => 
                                                <div
                                                    style={{
                                                        display: "block"
                                                    }}
                                                >
                                                    <h3 style={{ color: "#FFF" }}>{v.name}</h3>
                                                    <div>
                                                        체력 +{v.hp.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        방어력 +{v.defense.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        데미지 +{v.damage.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        가격 {v.price.toLocaleString()}골드
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: 5,
                                                            borderTop: "1px solid #fff",
                                                            fontSize: 10,
                                                        }}
                                                    >
                                                        {v.description}
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <div
                                                onClick={() => releaseEquiment(v)}
                                                style={{
                                                    position: "relative",
                                                }}
                                            >
                                                <img
                                                    src={v.itemUrl}
                                                    style={{
                                                        objectFit: "contain",
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: -5,
                                                        right: -12,
                                                        zIndex: 1,
                                                        fontSize: 30,
                                                        fontWeight: "bold",
                                                        color: 
                                                        v.itemRank == "S" ? "#DED714"
                                                        : v.itemRank == "A" ? "#EC5C5C"
                                                        : v.itemRank == "B" ? "#00DEFF"
                                                        : "#FFF",
                                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                        width: 30,
                                                        height: 45,
                                                        borderBottomLeftRadius: 10,
                                                    }}
                                                >
                                                    {v.itemRank}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )
                                    :
                                    <div>
                                        갑옷
                                    </div>
                                }
                                {
                                    equiment.filter((v) => v.itemType == "WEAPON").length > 0 ?
                                    equiment.map((v) => 
                                        v.itemType == "WEAPON" &&
                                        <Tooltip
                                            placement="right"
                                            color="rgba(0, 0, 0, 0.7)"
                                            title={() => 
                                                <div
                                                    style={{
                                                        display: "block"
                                                    }}
                                                >
                                                    <h3 style={{ color: "#FFF" }}>{v.name}</h3>
                                                    <div>
                                                        체력 +{v.hp.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        방어력 +{v.defense.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        데미지 +{v.damage.toLocaleString()}
                                                    </div>
                                                    <div>
                                                        가격 {v.price.toLocaleString()}골드
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: 5,
                                                            borderTop: "1px solid #fff",
                                                            fontSize: 10,
                                                        }}
                                                    >
                                                        {v.description}
                                                    </div>
                                                </div>
                                            }
                                        >
                                            <div
                                                onClick={() => releaseEquiment(v)}
                                                style={{
                                                    position: "relative",
                                                }}
                                            >
                                                <img
                                                    src={v.itemUrl}
                                                    style={{
                                                        objectFit: "contain",
                                                        width: "100%",
                                                        height: "100%",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        top: -5,
                                                        right: -12,
                                                        zIndex: 1,
                                                        fontSize: 30,
                                                        fontWeight: "bold",
                                                        color: 
                                                        v.itemRank == "S" ? "#DED714"
                                                        : v.itemRank == "A" ? "#EC5C5C"
                                                        : v.itemRank == "B" ? "#00DEFF"
                                                        : "#FFF",
                                                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                        width: 30,
                                                        height: 45,
                                                        borderBottomLeftRadius: 10,
                                                    }}
                                                >
                                                    {v.itemRank}
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )
                                    :
                                    <div>
                                        무기
                                    </div>
                                }
                            </div>
                            <div 
                                className="charaImg"
                                style={{
                                    position: "relative",
                                }}
                            >
                                <img
                                    src="./sword.png"
                                    style={{
                                        objectFit: "cover",
                                        width: "100%",
                                        height: "100%",
                                        marginTop: "-12px",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="charaStatus">
                        <div className="statusTop">
                            캐릭터 스탯
                        </div>
                        <div className="status">
                            <div className="stats">
                                <div>
                                    <User
                                        width="16px"
                                        height="16px" 
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    이름
                                </div>
                                <div>{userData?.nickname}</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Hp
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}  
                                    />
                                    체력
                                </div>
                                <div>{userData?.hp?.toLocaleString()}</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Armor
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    방어력
                                </div>
                                <div>{userData?.defense?.toLocaleString()}</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Damage
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    데미지
                                </div>
                                <div>{userData?.damage?.toLocaleString()}</div>
                            </div>
                            <div className="stats">
                                <div>
                                    <Coin
                                        width="16px"
                                        height="16px"
                                        style={{
                                            marginRight: "5px"
                                        }}
                                    />
                                    골드
                                </div>
                                <div>{userData?.money?.toLocaleString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inventory">
                    <div className="invenTop">
                        <div className="invenMode">
                            <div className="invenName">인벤토리</div>
                            <Tooltip placement="right" color="#858cec" title="장비를 선택하여 판매할 수 있습니다.">
                            <div
                                className="sellMode"
                                onClick={onSellModeChange}
                            >
                                    판매 모드
                            </div>
                            </Tooltip>
                        </div>
                        { onSell && 
                            <div>
                                <button
                                    className="sellBtn"
                                    onClick={onArankSellModal}
                                >
                                    A등급 전체 판매
                                </button>
                                <Modal title="안내" visible={aSellModal} onOk={sellItemA} onCancel={onArankSellModalClose}>
                                    <p>A등급 전체 판매 하시겠습니까?</p>
                                </Modal>
                                <button
                                    className="sellBtn"
                                    onClick={onBrankSellModal}
                                >
                                    B등급 전체 판매
                                </button>
                                <Modal title="안내" visible={bSellModal} onOk={sellItemB} onCancel={onBrankSellModalClose}>
                                    <p>B등급 전체 판매 하시겠습니까?</p>
                                </Modal>
                                <button
                                    className="sellBtn"
                                    onClick={onCrankSellModal}
                                >
                                    C등급 전체 판매
                                </button>
                                <Modal title="안내" visible={cSellModal} onOk={sellItemC} onCancel={onCrankSellModalClose}>
                                    <p>C등급 전체 판매 하시겠습니까?</p>
                                </Modal>
                                <button
                                    className="sellBtn"
                                    onClick={sellItem}
                                >
                                    판매
                                </button>
                            </div>
                        }
                    </div>
                    <div className="invenArray">
                        {item.map((item, index) => (
                            <div
                                style={{
                                    position: "relative",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {
                                    item.itemRank == 'S' &&
                                    <img
                                        src={"./effect.gif"}
                                        style={{
                                            left: 0,
                                            position: "absolute",
                                            objectFit: "contain",
                                            width: 150,
                                            height: 150,
                                            zIndex: 0
                                        }}
                                    />
                                }
                                <Tooltip
                                    placement="right"
                                    color="rgba(0, 0, 0, 0.7)"
                                    title={() => 
                                        <div
                                            style={{
                                                display: "block"
                                            }}
                                        >
                                            <h3 style={{ color: "#FFF" }}>{item.name}</h3>
                                            <div>
                                                체력 +{item.hp.toLocaleString()}
                                            </div>
                                            <div>
                                                방어력 +{item.defense.toLocaleString()}
                                            </div>
                                            <div>
                                                데미지 +{item.damage.toLocaleString()}
                                            </div>
                                            <div>
                                                가격 {item.price.toLocaleString()}골드
                                            </div>
                                            <div
                                                style={{
                                                    marginTop: 5,
                                                    borderTop: "1px solid #fff",
                                                    fontSize: 10,
                                                }}
                                            >
                                                {item.description}
                                            </div>
                                        </div>
                                    }
                                >
                                    <div
                                        className="invenItem"
                                        onClick={() => itemCheck(item, index)}
                                    >
                                        <div
                                            style={{
                                                position: "relative",
                                            }}
                                        >
                                            <img
                                                src={item.itemUrl}
                                                style={{
                                                    objectFit: "contain",
                                                    width: 100,
                                                    height: 100,
                                                }}
                                            />
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: -5,
                                                    right: 0,
                                                    zIndex: 1,
                                                    fontSize: 30,
                                                    fontWeight: "bold",
                                                    color: 
                                                    item.itemRank == "S" ? "#DED714"
                                                    : item.itemRank == "A" ? "#EC5C5C"
                                                    : item.itemRank == "B" ? "#00DEFF"
                                                    : "#FFF",
                                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                                    width: 30,
                                                    height: 45,
                                                    borderBottomLeftRadius: 10,
                                                }}
                                            >
                                                {item.itemRank}
                                            </div>
                                        </div>
                                        { sell &&
                                            <div className="checkBox">
                                                {
                                                    item.isChecked ?
                                                    <div
                                                        style={{
                                                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                            top: -100,
                                                            right: 0,
                                                            width: 100,
                                                            height: 100,
                                                            borderRadius: 5,
                                                            textAlign: "center",
                                                        }}
                                                        >
                                                        <Check
                                                            style={{
                                                                color: "#fff",
                                                                width: 100,
                                                                height: 100,
                                                            }}
                                                        />
                                                    </div>
                                                    :
                                                    <div
                                                        style={{
                                                            position: "absolute",
                                                            top: -100,
                                                            right: 0,
                                                            width: 100,
                                                            height: 100,
                                                            borderRadius: 5,
                                                            textAlign: "center",
                                                        }}
                                                    >
                                                    </div>
                                                }
                                            </div>
                                        }
                                    </div>
                                </Tooltip>
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            textAlign: "right",
                            marginRight: 10,
                            marginTop: 5,
                            fontWeight: "bold",
                            fontSize: 15,
                        }}
                    >
                        {item.length} / 300
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CharacterSet;