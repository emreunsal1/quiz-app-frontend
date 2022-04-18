import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import Button from "./Button";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";

export default function QuestionsCard({ questions, deleteQuestion, setDeleteQuestion, deleteOneQuestion }) {
  const [tableData, setTableData] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);

  useEffect(() => {
    const data = questions.map((_question) => {
      const options = _question.options.map((option) => {
        return {
          content: option.optionsContent,
          correct: option.correct,
        };
      });
      return {
        key: _question._id,
        question: _question.question,
        time: _question.time,
        options: options,
      };
    });
    setTableData(data);
  }, [questions]);

  const editQuestionOnclick = (questionId) => {};

  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      key: "question",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      width: "12%",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => {
        return (
          <div className="actions-group">
            <div style={{ cursor: "pointer" }} onClick={() => deleteOneQuestion(record.key)}>
              delete
            </div>
            <div
              onClick={() => {
                setEditQuestion(record.key);
                setModalIsVisible(true);
              }}
            >
              edit
            </div>
          </div>
        );
      },
    },
  ];

  const rowSelection = {
    onSelect: (record) => {
      setDeleteQuestion([...deleteQuestion, record.key]);
    },
    onSelectAll: (record, selectedRowKeys) => {
      const keys = selectedRowKeys.map((row) => row.key);
      setDeleteQuestion(keys);
    },
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        rowSelection={rowSelection}
        expandable={{
          expandedRowRender: (record) => {
            const exDataSource = record.options.map((option, index) => {
              if (option.correct) return { key: index, option: option.content, correct: <CheckCircleTwoTone /> };
              return { key: index, option: option.content, correct: <CloseCircleTwoTone /> };
            });

            return (
              <Table
                pagination={false}
                dataSource={exDataSource}
                columns={[
                  {
                    title: "Option",
                    dataIndex: "option",
                    key: "option",
                  },
                  {
                    title: "Correct",
                    dataIndex: "correct",
                    key: "correct",
                  },
                ]}
              />
            );
          },
        }}
      />
      <Modal centered visible={modalIsVisible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)} width={1000}></Modal>
    </div>
  );
}
