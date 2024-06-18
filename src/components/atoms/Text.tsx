type TextOwnProps<E extends React.ElementType> = {
    className: string;
    children?: React.ReactNode;
    as?: E;
};

type TextProps<E extends React.ElementType> = TextOwnProps<E> & Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>;

export const Text = <E extends React.ElementType = 'div'>({ className, children, as }: TextProps<E>) => {
    const Component = as || 'div';

    // If 'as' prop is provided and it's a 'p' element, use it. Otherwise, use 'div'.
    const Element = Component === 'p' ? 'p' : Component;

    return (
        <Element className={className}>{children}</Element>
    );
};

// type TextOwnProps<E extends React.ElementType> = {
//     className: string
//     children?: React.ReactNode
//     as?: E
// }

// type TextProps<E extends React.ElementType> = TextOwnProps<E> & Omit<React.ComponentProps<E>, keyof TextOwnProps<E>>

// export const Text = <E extends React.ElementType = 'div'>({ className, children, as }: TextProps<E>) => {
//     const Component = as || 'div'
//     return (
//         <Component className={className}>{children}</Component>
//     )
// }


