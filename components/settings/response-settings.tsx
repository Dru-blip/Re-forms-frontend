"use client"

import { useContext, useEffect, useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"
import FormContext from "@/context/form-context"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { ISettings } from "@/types"
import SaveSettingsButton from "./settings-save-btn"

export default function ResponseSettings({setting}:{setting:ISettings}) {
    const {settings,setSettings}=useContext(FormContext)
    useEffect(()=>{
        setSettings(setting)
    },[])
    return (
        <Card>
            <CardContent className="grid grid-cols-1 gap-5 mt-4">
                <div className="flex items-center justify-start">
                    <Label className="text-md mr-2">Allow Response Editing</Label>
                    <Switch checked={settings.editResponse} onCheckedChange={(change)=>{
                        setSettings({...settings,editResponse:change})
                    }}/>
                </div>
                <p></p>

            </CardContent>
            <Separator />
            <CardFooter className="p-2">
                <SaveSettingsButton />
            </CardFooter>
        </Card>
    )
}