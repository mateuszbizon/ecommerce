"use client"

import { Category } from '@/sanity/types'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

type CategorySelectorProps = {
    categories: Category[]
}

function CategorySelector({ categories }: CategorySelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const router = useRouter()
   
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? categories.find((category) => category.title === value)?.title
                        : "Select category..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search category..." />
                    <CommandList>
                        <CommandEmpty>No category found.</CommandEmpty>
                        <CommandGroup>
                            {categories.map((category) => (
                                <CommandItem
                                    key={category._id}
                                    value={category.title}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                        router.push(`/categories/${category.slug?.current}`)
                                    }}
                                >
                                    {category.title}
                                    <Check
                                        className={cn(
                                        "ml-auto",
                                        value === category.title ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default CategorySelector