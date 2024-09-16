"use client"

import { useContext, useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import FormContext from "@/context/form-context"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import SaveSettingsButton from "./settings-save-btn"

export default function DefaultSettings() {
    const {formSettings,updateFormSettings}=useContext(FormContext)

    return (
        <Card>
            <CardContent className="grid grid-cols-1 gap-5 mt-4">
                <div className="flex items-center justify-start">
                    <Label className="text-md mr-2">Make Questions Required by default</Label>
                    <Switch checked={formSettings.questionsRequiredDefault} onCheckedChange={(change)=>{
                        updateFormSettings({...formSettings,questionsRequiredDefault:change})
                    }}/>
                </div>
                <div className="flex items-center justify-start">
                    <Label className="text-md mr-2">
                        Show link to submit another response
                    </Label>
                    <Switch checked={formSettings.anotherResponse} onCheckedChange={(change)=>{
                        updateFormSettings({...formSettings,anotherResponse:change})
                    }}/>
                </div>
                <div>
                    <h1>Confirmation Messsage</h1>
                    <Input value={formSettings.confirmationMessage} onChange={(e)=>{
                        console.log(e.target.value)
                    }} />
                </div>

            </CardContent>
            <Separator />
            <CardFooter className="p-2">
                <SaveSettingsButton />
            </CardFooter>
        </Card>
    )
}