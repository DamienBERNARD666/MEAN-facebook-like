<?php

namespace CarnetBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\RedirectResponse;
use CarnetBundle\Form\addForm;
use CarnetBundle\Entity\Contact;

class DefaultController extends Controller {

    /**
     * @Route("/")
     */
    public function indexAction() {
        $em = $this->getDoctrine()->getManager();
        $securityContext = $this->container->get('security.authorization_checker');
        if ($securityContext->isGranted('IS_AUTHENTICATED_FULLY')) {
            $utilisateur = $this->get('security.token_storage')->getToken()->getUser();
             $contacts = $em->getRepository('CarnetBundle:Contact')->findBy(array('utilisateur' => $utilisateur->getId()));
            $affichage = '0';

            return $this->render('CarnetBundle:Default:index.html.twig', array('contacts' => $contacts,
                                                                               'affichage' => $affichage));
        } else {

            return $this->render('CarnetBundle:Default:index.html.twig');
        }
    }

    public function addAction(Request $request) {
        $utilisateur = $this->get('security.token_storage')->getToken()->getUser();
        $entity = new Contact();
        $form = $this->createForm(addForm::class, $entity);

        if ($request->getMethod() == 'POST') {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $entity->setUtilisateur($utilisateur);
                $em->persist($entity);
                $em->flush();

                return $this->redirect($this->generateUrl('index'));
            }
        }
        $affichage = '1';
        return $this->render('CarnetBundle:Default:index.html.twig', array('utilisateur' => $utilisateur,
                    'form' => $form->createView(),
                    'affichage' => $affichage));
    }

    public function deleteAction($id) {
        $em = $this->getDoctrine()->getManager();
        $entity = $em->getRepository('CarnetBundle:Contact')->find($id);

        $em->remove($entity);
        $em->flush();

        return $this->redirect($this->generateUrl('index'));
    }

    public function afficherAction($id) {
        $em = $this->getDoctrine()->getManager();
        $utilisateur = $this->get('security.token_storage')->getToken()->getUser();
        $contacts = $em->getRepository('CarnetBundle:Contact')->findBy(array('id' => $id, 'utilisateur' => $utilisateur->getId()));
        $affichage = '2';

        return $this->render('CarnetBundle:Default:index.html.twig', array('contacts' => $contacts,
                    'affichage' => $affichage));
    }

    public function modifierAction($id, Request $request) {
        $em = $this->getDoctrine()->getManager();
        $utilisateur = $this->get('security.token_storage')->getToken()->getUser();
        $entity = $em->getRepository('CarnetBundle:Contact')->find($id);
        $em->remove($entity);
        $form = $this->createForm(addForm::class, $entity);

        if ($request->getMethod() == 'POST') {
            $form->handleRequest($request);
            if ($form->isValid()) {
                $em = $this->getDoctrine()->getManager();
                $entity->setUtilisateur($utilisateur);
                $em->persist($entity);
                $em->flush();

                return $this->redirect($this->generateUrl('index'));
            }
        }
        $affichage = '3';


        return $this->render('CarnetBundle:Default:index.html.twig', array('form' => $form->createView(),
                    'affichage' => $affichage));
    }

}
