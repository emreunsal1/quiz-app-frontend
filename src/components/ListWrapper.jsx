import React, { useState, useEffect } from "react";
import { getList } from "../functions/axiosFunctions";
import CreateListPopup from "./CreateListPopup";
import ListCard from "./ListCard";
import { deleteListToDatabase } from "./../functions/axiosFunctions";
import { ConsoleSqlOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Card, Row, Col, Button } from "antd";

export default function QuestionList() {
  const [listInfo, setListInfo] = useState([]);
  const [isPopup, setIsPopup] = useState(false);
  const [onSelect, setOnSelect] = useState(false);
  const [deleteList, setDeleteList] = useState([]);

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    const response = await getList();
    setListInfo(response);
    setDeleteList([]);
  };

  const popupOncreate = (list) => {
    setListInfo([list, ...listInfo]);
  };

  const deleteSelected = async () => {
    console.log(deleteList);
    if (deleteList.length > 0) {
      await deleteListToDatabase(deleteList);
    }
    const clearList = listInfo.filter((list) => !deleteList.includes(list._id));
    console.log("list", clearList);
    setListInfo(clearList);
    setDeleteList([]);
    setOnSelect(false);
  };

  const onDelete = (listId) => {
    const clearList = listInfo.filter((list) => list._id !== listId);
    setListInfo(clearList);
  };

  useEffect(() => {
    if (onSelect === false) {
      setDeleteList([]);
    }
  }, [onSelect]);

  return (
    <div className="list-wrapper-container">
      <div className="title">
        <h1>Quizes</h1>
      </div>
      <div className="options">
        <Button onClick={() => setOnSelect(!onSelect)}>{onSelect ? "seçimi kaldır" : "seç"}</Button>
        {deleteList.length > 0 && <Button onClick={() => deleteSelected()}>Sil</Button>}
      </div>
      <Row gutter={[16, 18]} style={{ width: "100%", padding: 0 }}>
        <Col onClick={() => setIsPopup(true)} style={{ cursor: "pointer" }} span={8} className="gutter-row">
          <div className="card add-list">
            <Card style={{ height: "100%" }}>
              <div className="icon-container">
                <PlusCircleOutlined />
              </div>
            </Card>
          </div>
        </Col>

        {listInfo.map((list, index) => (
          <ListCard
            key={index}
            list={list}
            setDeleteList={setDeleteList}
            fetchLists={fetchLists}
            deleteList={deleteList}
            onOpenSelect={onSelect}
            onDelete={onDelete}
          />
        ))}
        <div className="createPopup">{isPopup && <CreateListPopup setPopup={setIsPopup} popupOnCreate={popupOncreate} />}</div>
      </Row>
    </div>
  );
}
