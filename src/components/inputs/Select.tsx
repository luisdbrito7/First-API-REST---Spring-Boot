import { cn } from "@/utils/cn";

interface SelectProps {
	opcoes: string[];
	selectedOption: string;
	onSelect: (selectedOption: string) => void;
	texto: string;
	placeholder?: string;
}

export function Select({
	opcoes,
	onSelect,
	texto,
	placeholder,
	selectedOption,
}: SelectProps) {
	return (
		<div className="flex flex-col w-full ">
			<label className="mb-2 font-semibold text-emerald-950">
				<span>{texto}:</span>
			</label>
			<div>
				<select
					defaultValue={selectedOption ? selectedOption : ""}
					onChange={(event: any) => onSelect(event.target.value)}
					className={cn(
						`border border-gray-200 rounded-lg w-full
						focus:outline-emerald-300 px-3 py-2 mb-2 bg-white`,
						selectedOption === placeholder
							? "text-gray-400"
							: "text-emerald-950"
					)}
				>
					{placeholder && (
						<option value="" disabled>
							{placeholder}
						</option>
					)}
					{opcoes.map((option, index) => (
						<option
							key={index}
							value={opcoes[index]}
							className="text-emerald-950"
						>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
