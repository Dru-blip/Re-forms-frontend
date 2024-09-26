"use client";

import FormContext from "@/context/form-context";
import { useContext } from "react";
import QuestionCard from "./question-card";
import { DndContext } from "@dnd-kit/core";
import * as questionActions from "@/lib/actions/questions";
import { SortableContext } from "@dnd-kit/sortable";

export function QuestionsList() {
    const { formQuestions, updateFormQuestions } = useContext(FormContext);
    return (
        <div className="grid grid-cols-1 gap-4">
            <DndContext
                onDragEnd={async (e) => {
                    const activeIndex = e.active.data.current?.index;
                    const dropIndex = e.over?.data.current?.index;
                    let q1 = formQuestions[activeIndex];
                    let q2 = formQuestions[dropIndex];

                    const temp = q1.order;
                    q1.order = q2.order;
                    q2.order = temp;

                    [q1,q2]=[q2,q1]
                    
                    formQuestions[activeIndex]=q1
                    formQuestions[dropIndex]=q2

                    updateFormQuestions([...formQuestions]);
                    await questionActions.reorderQuestion(q1, q2);
                }}
            >
                <SortableContext items={formQuestions}>
                    {formQuestions.map((val, index) => (
                        <QuestionCard index={index} key={val.id} question={val} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
