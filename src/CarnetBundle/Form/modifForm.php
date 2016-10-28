<?php

namespace CarnetBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;


class modifForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('nom', TextType::class)
            ->add('prenom', TextType::class)
            ->add('email', EmailType::class)
            ->add('telephone', NumberType::class)
            ->add('adresse', TextType::class)
            ->add('site', TextType::class)
            ->add('enregistrer', SubmitType::class);
    }
    
        
    public function getName()
    {
        return 'carnetbundle_contact';
    }
}